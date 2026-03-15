"""DSTP Backend — Visitor Tracking API Endpoints

Endpoints for tracking visitor behavior, storing time spent on pages,
and linking anonymous visitor sessions to user accounts after registration.
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
import hashlib

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
    and recent pages viewed. Only returns stats for authenticated user.
    
    GET /api/v1/track/my-stats/
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Retrieve visitor statistics for current authenticated user."""
        # Get all visitor sessions linked to this user
        visitor_sessions = VisitorSession.objects.filter(user=request.user)
        
        if not visitor_sessions.exists():
            return Response(
                {'success': False, 'message': 'No visitor sessions found for this user'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            # Aggregate stats across all user's sessions
            total_visits = sum(v.total_visits for v in visitor_sessions)
            total_pages_viewed = sum(v.total_pages_viewed for v in visitor_sessions)
            first_seen = min(v.first_seen for v in visitor_sessions)
            last_seen = max(v.last_seen for v in visitor_sessions)
            
            # Get last 10 pages viewed across all user sessions
            recent_pages = PageVisit.objects.filter(
                visitor__in=visitor_sessions
            ).order_by('-visited_at')[:10].values(
                'page_url', 'page_title', 'visited_at', 'time_spent_seconds'
            )
            
            # Build sessions list with hashed IPs (not raw IPs)
            sessions_data = []
            for visitor in visitor_sessions:
                # Hash IP for privacy — reveals no actual IP address
                ip_hash = hashlib.sha256(visitor.ip_address.encode()).hexdigest()[:8] if visitor.ip_address else 'unknown'
                sessions_data.append({
                    'device_type': visitor.device_type,
                    'browser': visitor.browser,
                    'os': visitor.os,
                    'ip_hash': ip_hash,  # hashed IP only, not raw IP
                    'total_visits': visitor.total_visits,
                    'first_seen': visitor.first_seen.isoformat(),
                    'last_seen': visitor.last_seen.isoformat(),
                })
            
            return Response(
                {
                    'success': True,
                    'data': {
                        'user_email': request.user.email,  # confirm this is the user's data
                        'total_visits': total_visits,
                        'total_pages_viewed': total_pages_viewed,
                        'first_seen': first_seen.isoformat(),
                        'last_seen': last_seen.isoformat(),
                        'sessions': sessions_data,
                        'recent_pages': list(recent_pages),
                    }
                },
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            return Response(
                {'success': False, 'message': f'Error retrieving stats: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )