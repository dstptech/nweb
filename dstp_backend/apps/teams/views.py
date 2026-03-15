from rest_framework import viewsets
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
    """
    CRUD for team members.

    Public  (list/retrieve): returns active members only, uses public serializer.
    Admin   (create/update): returns full serializer with user link info.
    """

    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'department']
    search_fields    = ['name', 'role', 'department']
    ordering_fields  = ['display_order', 'name', 'joined', 'created_at']
    ordering         = ['display_order', 'name']

    def get_queryset(self):
        """
        Public users see active members only.
        Admin/Editor users see all members including inactive.
        """
        user = self.request.user

        # Check if user is authenticated and has editor/admin role
        if user and user.is_authenticated and hasattr(user, 'role') \
                and user.role in ('admin', 'editor'):
            # Admin sees everyone
            return TeamMember.objects.select_related('user').all()

        # Public sees active members only
        return TeamMember.objects.filter(
            status='active'
        ).select_related('user')

    def get_serializer_class(self):
        """
        Use the minimal public serializer for list/retrieve.
        Use the full admin serializer for create/update/delete.
        """
        if self.action in ['list', 'retrieve']:
            # Check if admin/editor — if so, send full data
            user = self.request.user
            if user and user.is_authenticated and hasattr(user, 'role') \
                    and user.role in ('admin', 'editor'):
                return TeamMemberSerializer
            # Public website gets minimal data only
            return TeamMemberPublicSerializer

        # All write operations use full serializer
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