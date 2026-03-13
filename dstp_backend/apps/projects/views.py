from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import Project
from .serializers import ProjectSerializer

@extend_schema_view(
    list=extend_schema(auth=None, description="Public: List all projects"),
    retrieve=extend_schema(auth=None, description="Public: Retrieve project by ID"),
    create=extend_schema(description="Editor/Admin: Create a new project"),
    update=extend_schema(description="Editor/Admin: Update a project"),
    partial_update=extend_schema(description="Editor/Admin: Partial update a project"),
    destroy=extend_schema(description="Admin only: Delete a project"),
)
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["client", "completed_on"]
    search_fields = ["title", "description", "client"]
    ordering_fields = ["completed_on", "title"]
    ordering = ["-completed_on"]

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