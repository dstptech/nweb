"""Core Module Serializers

Shared serializers for the core module including visitor tracking and analytics.
"""

from rest_framework import serializers
from .models import VisitorSession, PageVisit


class VisitorSessionSerializer(serializers.ModelSerializer):
    """Serializer for VisitorSession model (read-only output).
    
    Returns visitor session metadata including:
    - Device/browser information
    - Visit statistics
    - Registration status
    """
    full_name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = VisitorSession
        fields = [
            'id', 'session_key', 'ip_address', 'device_type', 'browser', 'os',
            'total_visits', 'total_pages_viewed', 'first_seen', 'last_seen',
            'is_registered', 'is_active', 'full_name'
        ]
        read_only_fields = fields
    
    def get_full_name(self, obj):
        """Return user's full name if registered, else 'Anonymous'."""
        if obj.user:
            return obj.user.get_full_name()
        return "Anonymous"


class PageVisitSerializer(serializers.ModelSerializer):
    """Serializer for PageVisit model (read-only output).
    
    Returns page visit details including:
    - Page URL and title
    - Time spent on page
    - Visit timestamp
    """
    visitor_info = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = PageVisit
        fields = [
            'id', 'page_url', 'page_title', 'referrer_page',
            'time_spent_seconds', 'visited_at', 'visitor_info'
        ]
        read_only_fields = fields
    
    def get_visitor_info(self, obj):
        """Return masked visitor session key for privacy."""
        session_key = obj.visitor.session_key
        return {
            'session_key': session_key[:8] + '...' if session_key else None,
            'is_registered': obj.visitor.is_registered
        }


class VisitorAnalyticsSerializer(serializers.Serializer):
    """
    
    Serializer for visitor analytics data (read-only output).
    Returns comprehensive visitor statistics including:
    - Visit history
    - Device/browser info
    - Traffic sources (UTM parameters)
    - Time spent analytics'


    """
    total_visits = serializers.IntegerField()
    total_pages_viewed = serializers.IntegerField()
    average_time_per_page = serializers.FloatField()
    device_profile = serializers.DictField()
    traffic_sources = serializers.DictField()
    recent_pages = serializers.ListField()
