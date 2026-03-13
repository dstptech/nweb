from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import Project
from .serializers import ProjectSerializer
 
 
@extend_schema_view(
    list=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Projects"],
        summary="List all projects (public)",
        description="Returns all projects/case studies. No authentication required.",
    ),
    retrieve=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Projects"],
        summary="Get a project by ID (public)",
        description="Returns a single project record.",
    ),
    create=extend_schema(
        tags=["Projects"],
        summary="Create a project (Editor/Admin)",
        description="Creates a new project entry.",
    ),
    update=extend_schema(
        tags=["Projects"],
        summary="Update a project (Editor/Admin)",
        description="Full update of a project.",
    ),
    partial_update=extend_schema(
        tags=["Projects"],
        summary="Partial update a project (Editor/Admin)",
        description="Update specific fields of a project.",
    ),
    destroy=extend_schema(
        tags=["Projects"],
        summary="Delete a project (Admin only)",
        description="Permanently deletes a project. Requires Admin role.",
    ),
)
class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset         = Project.objects.all()
 
    # ✅ FIXED — SearchFilter and OrderingFilter were missing
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["client", "completed_on"]
    search_fields    = ["title", "description", "client"]
    ordering_fields  = ["completed_on", "title"]
    ordering         = ["-completed_on"]
 
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [AllowAny]
        elif self.action in ["create", "update", "partial_update"]:
            permission_classes = [IsEditor]
        elif self.action == "destroy":
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [perm() for perm in permission_classes]