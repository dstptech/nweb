from rest_framework import serializers
from .models import ServiceCategory, Service, ServiceFeature


class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ServiceFeature
        fields = "__all__"


class ServiceSerializer(serializers.ModelSerializer):
    # Admin UI expects 'name' — we expose 'title' under both names
    # Frontend can use either 'title' or 'name', both return same value
    name     = serializers.CharField(source='title', read_only=True)

    # Admin UI expects a 'status' string — we map is_featured boolean to it
    # True  → "Featured"
    # False → "Standard"
    status   = serializers.SerializerMethodField()

    # Nest features inside each service response
    features = ServiceFeatureSerializer(many=True, read_only=True)

    class Meta:
        model  = Service
        fields = [
            'id',
            'category',
            'title',
            'name',         # alias for title — for admin UI
            'description',
            'is_featured',
            'status',       # human-readable version of is_featured
            'created_at',   # admin table 'created' column
            'features',
        ]
        read_only_fields = ['id', 'name', 'status', 'created_at']

    def get_status(self, obj):
        """
        Converts is_featured boolean to a readable status string.
        Admin table shows this in the 'status' column.
        """
        return "Featured" if obj.is_featured else "Standard"


class ServiceCategorySerializer(serializers.ModelSerializer):
    # Nest all services inside each category
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model  = ServiceCategory
        fields = "__all__"