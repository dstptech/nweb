#!/usr/bin/env python
# -*- coding: utf-8 -*-

views_content = '''"""
Dashboard aggregation endpoints.
All endpoints require IsAdmin permission.
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

from apps.authentication.permissions import IsAdmin
from apps.services.models import Service
from apps.projects.models import Project
from apps.blog.models import Blog
from apps.careers.models import Career
from apps.contact.models import Contact
from apps.teams.models import TeamMember
from apps.core.models import VisitorSession, PageVisit


class DashboardStatsView(APIView):
    """GET /api/v1/dashboard/stats/"""
    permission_classes = [IsAdmin]

    def get(self, request):
        stats = {
            "total_services":    Service.objects.count(),
            "featured_services": Service.objects.filter(is_featured=True).count(),
            "total_projects":    Project.objects.count(),
            "total_blogs":       Blog.objects.count(),
            "published_blogs":   Blog.objects.filter(is_published=True).count(),
            "draft_blogs":       Blog.objects.filter(is_published=False).count(),
            "total_careers":     Career.objects.count(),
            "open_careers":      Career.objects.filter(is_open=True).count(),
            "total_contacts":    Contact.objects.count(),
            "recent_contacts":   Contact.objects.filter(
                submitted_on__gte=timezone.now() - timedelta(days=7)
            ).count(),
            "total_team":        TeamMember.objects.count(),
            "active_team":       TeamMember.objects.filter(status='active').count(),
        }
        return Response({'success': True, 'data': stats}, status=status.HTTP_200_OK)


class DashboardAnalyticsView(APIView):
    """GET /api/v1/dashboard/analytics/?days=30"""
    permission_classes = [IsAdmin]

    def get(self, request):
        days  = int(request.query_params.get('days', 30))
        since = timezone.now() - timedelta(days=days)
        sessions = VisitorSession.objects.filter(first_seen__gte=since)
        devices = list(sessions.values('device_type').annotate(count=Count('id')).order_by('-count'))
        browsers = list(sessions.values('browser').annotate(count=Count('id')).order_by('-count')[:5])
        top_pages = list(PageVisit.objects.filter(visited_at__gte=since).values('page_url').annotate(visits=Count('id')).order_by('-visits')[:10])
        return Response({
            'success': True,
            'data': {
                'period_days': days,
                'total_sessions': sessions.count(),
                'registered_users': sessions.filter(is_registered=True).count(),
                'anonymous_users': sessions.filter(is_registered=False).count(),
                'devices': devices,
                'browsers': browsers,
                'top_pages': top_pages,
            }
        }, status=status.HTTP_200_OK)


class DashboardProjectsByCategoryView(APIView):
    """GET /api/v1/dashboard/projects-by-category/"""
    permission_classes = [IsAdmin]

    def get(self, request):
        by_category = list(Project.objects.values('category').annotate(count=Count('id')).order_by('-count'))
        label_map = dict(Project.CATEGORY_CHOICES)
        for item in by_category:
            item['label'] = label_map.get(item['category'], item['category'])
        return Response({'success': True, 'data': by_category}, status=status.HTTP_200_OK)


class DashboardRecentActivityView(APIView):
    """GET /api/v1/dashboard/recent-activity/?limit=10"""
    permission_classes = [IsAdmin]

    def get(self, request):
        limit = int(request.query_params.get('limit', 10))
        activity = []
        for c in Contact.objects.order_by('-submitted_on')[:5]:
            activity.append({'type': 'contact', 'description': f"New message from {c.name} ({c.email})", 'time': c.submitted_on.isoformat(), 'link': f"/admin/contacts/{c.id}"})
        for b in Blog.objects.filter(is_published=True).order_by('-published_at')[:5]:
            activity.append({'type': 'blog', 'description': f"Blog published: {b.title}", 'time': (b.published_at.isoformat() if b.published_at else b.published_on.isoformat()), 'link': f"/admin/blog/{b.id}"})
        for p in Project.objects.order_by('-completed_on')[:5]:
            activity.append({'type': 'project', 'description': f"Project added: {p.title} - {p.client}", 'time': p.completed_on.isoformat(), 'link': f"/admin/projects/{p.id}"})
        for j in Career.objects.order_by('-posted_on')[:3]:
            activity.append({'type': 'career', 'description': f"Job posted: {j.title} in {j.location}", 'time': j.posted_on.isoformat(), 'link': f"/admin/careers/{j.id}"})
        activity.sort(key=lambda x: x['time'], reverse=True)
        return Response({'success': True, 'data': activity[:limit]}, status=status.HTTP_200_OK)
'''

# Write with explicit UTF-8 encoding
with open('apps/dashboard/views.py', 'w', encoding='utf-8') as f:
    f.write(views_content)

print(f"✅ views.py created ({len(views_content)} bytes)")
