"""DSTP Backend — Visitor Tracking API Endpoints

Endpoints for tracking visitor behavior, storing time spent on pages,
and linking anonymous visitor sessions to user accounts after registration.
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone

from apps.core.models import VisitorSession, PageVisit
from utils.exceptions import ValidationError


class TrackTimeSpentView(APIView):
    """Track time spent on a page.
    
    Frontend calls this when user LEAVES a page to record duration.
    Updates the PageVisit record with time_spent_seconds.
    
    POST /api/v1/track/time-spent/
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        """Update time spent on page.
        
        Input:
            {
                "page_url": "/services/web-development",
                "seconds": 47
            }
        """
        page_url = request.data.get('page_url')
        seconds = request.data.get('seconds', 0)

        # Validate input
        if not page_url:
            return Response(
                {'success': False, 'message': 'page_url is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get visitor from cookie
        session_key = request.COOKIES.get('dstp_visitor_id')
        if not session_key:
            return Response(
                {'success': False, 'message': 'No visitor cookie found'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            visitor = VisitorSession.objects.get(session_key=session_key)
            
            # Find the most recent PageVisit for this URL by this visitor
            page_visit = PageVisit.objects.filter(
                visitor=visitor,
                page_url=page_url
            ).order_by('-visited_at').first()
            
            if page_visit:
                # Update time spent
                page_visit.time_spent_seconds = seconds
                page_visit.save(update_fields=['time_spent_seconds'])
            
            return Response(
                {
                    'success': True,
                    'message': f'Time tracked: {seconds}s on {page_url}'
                },
                status=status.HTTP_200_OK
            )

        except VisitorSession.DoesNotExist:
            return Response(
                {'success': False, 'message': 'Session not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class LinkSessionToUserView(APIView):
    """Link anonymous visitor session to user account.
    
    Called after user registration to associate all browsing history
    with their new account.
    
    POST /api/v1/track/link-session/
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """Link current session to authenticated user."""
        session_key = request.COOKIES.get('dstp_visitor_id')
        
        if not session_key:
            return Response(
                {'success': False, 'message': 'No visitor session found'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            visitor = VisitorSession.objects.get(session_key=session_key)
            
            # Link session to user
            visitor.mark_as_registered(request.user)
            
            return Response(
                {
                    'success': True,
                    'message': f'Session linked to {request.user.email}',
                    'data': {
                        'total_visits': visitor.total_visits,
                        'total_pages_viewed': visitor.total_pages_viewed,
                        'first_seen': visitor.first_seen,
                    }
                },
                status=status.HTTP_200_OK
            )
            
        except VisitorSession.DoesNotExist:
            return Response(
                {'success': False, 'message': 'Session not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class GetVisitorStatsView(APIView):
    """Get visitor analytics and statistics.
    
    Returns visitor session data including device, browser, visit count,
    and recent pages viewed.
    
    GET /api/v1/track/my-stats/
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Retrieve visitor statistics."""
        session_key = request.COOKIES.get('dstp_visitor_id')
        
        if not session_key:
            return Response(
                {'success': False, 'message': 'No visitor session found'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            visitor = VisitorSession.objects.get(session_key=session_key)
            
            # Get last 10 pages viewed
            recent_pages = PageVisit.objects.filter(
                visitor=visitor
            ).order_by('-visited_at')[:10].values(
                'page_url', 'page_title', 'visited_at', 'time_spent_seconds'
            )
            
            return Response(
                {
                    'success': True,
                    'data': {
                        'session_key': visitor.session_key[:8] + '...',
                        'total_visits': visitor.total_visits,
                        'total_pages_viewed': visitor.total_pages_viewed,
                        'first_seen': visitor.first_seen.isoformat(),
                        'last_seen': visitor.last_seen.isoformat(),
                        'device_type': visitor.device_type,
                        'browser': visitor.browser,
                        'os': visitor.os,
                        'ip_address': visitor.ip_address,
                        'is_registered': visitor.is_registered,
                        'recent_pages': list(recent_pages),
                    }
                },
                status=status.HTTP_200_OK
            )
            
        except VisitorSession.DoesNotExist:
            return Response(
                {'success': False, 'message': 'Session not found'},
                status=status.HTTP_404_NOT_FOUND
            )