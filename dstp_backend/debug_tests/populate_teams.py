#!/usr/bin/env python
import os

# Create views.py
views_content = '''from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from drf_spectacular.utils import extend_schema_view, extend_schema

from apps.authentication.permissions import IsAdmin, IsEditor
from .models import TeamMember
from .serializers import TeamMemberSerializer, TeamMemberPublicSerializer


@extend_schema_view(
    list=extend_schema(
        auth=[],
        tags=["Team"],
        summary="List all active team members (public)",
        description="Returns active team members ordered by display_order. No auth required.",
    ),
    retrieve=extend_schema(
        auth=[],
        tags=["Team"],
        summary="Get a team member by ID (public)",
    ),
    create=extend_schema(
        tags=["Team"],
        summary="Add a team member (Editor/Admin)",
    ),
    update=extend_schema(
        tags=["Team"],
        summary="Update a team member (Editor/Admin)",
    ),
    partial_update=extend_schema(
        tags=["Team"],
        summary="Partial update a team member (Editor/Admin)",
    ),
    destroy=extend_schema(
        tags=["Team"],
        summary="Delete a team member (Admin only)",
    ),
)
class TeamMemberViewSet(viewsets.ModelViewSet):
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'department']
    search_fields    = ['name', 'role', 'department']
    ordering_fields  = ['display_order', 'name', 'joined', 'created_at']
    ordering         = ['display_order', 'name']

    def get_queryset(self):
        user = self.request.user
        if user and user.is_authenticated and hasattr(user, 'role') and user.role in ('admin', 'editor'):
            return TeamMember.objects.select_related('user').all()
        return TeamMember.objects.filter(status='active').select_related('user')

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            user = self.request.user
            if user and user.is_authenticated and hasattr(user, 'role') and user.role in ('admin', 'editor'):
                return TeamMemberSerializer
            return TeamMemberPublicSerializer
        return TeamMemberSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        elif self.action in ['create', 'update', 'partial_update']:
            permission_classes = [IsEditor]
        elif self.action == 'destroy':
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [p() for p in permission_classes]
'''

# Create serializers.py
serializers_content = '''from rest_framework import serializers
from .models import TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    is_linked_user = serializers.SerializerMethodField()
    user_email = serializers.SerializerMethodField()

    class Meta:
        model  = TeamMember
        fields = [
            'id', 'user', 'user_email', 'is_linked_user', 'name', 'role', 'department',
            'photo', 'bio', 'status', 'display_order', 'social_links', 'joined', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'user_email', 'is_linked_user']

    def get_is_linked_user(self, obj):
        return obj.user_id is not None

    def get_user_email(self, obj):
        if obj.user:
            return obj.user.email
        return None


class TeamMemberPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model  = TeamMember
        fields = ['id', 'name', 'role', 'department', 'photo', 'bio', 'social_links', 'joined', 'display_order']
'''

# Create admin.py
admin_content = '''from django.contrib import admin
from .models import TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'department', 'status', 'display_order', 'created_at')
    list_filter = ('status', 'department', 'created_at')
    search_fields = ('name', 'role', 'department')
    ordering = ('display_order', 'name')
    
    fieldsets = (
        ('Account Link', {'fields': ('user',)}),
        ('Profile', {'fields': ('name', 'role', 'department', 'photo', 'bio')}),
        ('Status', {'fields': ('status', 'display_order')}),
        ('Social', {'fields': ('social_links',)}),
        ('Dates', {'fields': ('joined', 'created_at', 'updated_at'), 'classes': ('collapse',)}),
    )
    readonly_fields = ('created_at', 'updated_at')
'''

# Write files
with open('apps/teams/views.py', 'w') as f:
    f.write(views_content)
print("✅ views.py created")

with open('apps/teams/serializers.py', 'w') as f:
    f.write(serializers_content)
print("✅ serializers.py created")

with open('apps/teams/admin.py', 'w') as f:
    f.write(admin_content)
print("✅ admin.py created")

print("\nAll files created successfully!")
