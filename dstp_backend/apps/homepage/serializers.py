from rest_framework import serializers
from .models import Homepage


class HomepageSerializer(serializers.ModelSerializer):
    """
    Serializes all homepage fields.
    JSON section fields accept any dict shape — frontend controls structure.
    """

    class Meta:
        model  = Homepage
        fields = [
            # Hero fields (existing)
            'id',
            'hero_title',
            'hero_subtitle',
            'hero_image',
            'banner_text',
            'banner_image',
            'stats_title',
            'stats_value',
            # New JSON sections
            'about',
            'services_section',
            'tech_stack',
            'projects_section',
            'testimonials_section',
            'contact_section',
            # Metadata
            'updated_on',
        ]
        # updated_on is auto-set — frontend should not send it
        read_only_fields = ['id', 'updated_on']