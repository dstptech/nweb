from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import Industry
from .serializers import IndustrySerializer

@extend_schema_view(
    list=extend_schema(auth=None, description="Public: List all industries"),
    retrieve=extend_schema(auth=None, description="Public: Retrieve industry by ID"),
    create=extend_schema(description="Editor/Admin: Create a new industry"),
    update=extend_schema(description="Editor/Admin: Update an industry"),
    partial_update=extend_schema(description="Editor/Admin: Partial update an industry"),
    destroy=extend_schema(description="Admin only: Delete an industry"),
)
class IndustryViewSet(viewsets.ModelViewSet):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer

    filterset_fields = ["name"]
    search_fields = ["name", "description"]
    ordering_fields = ["name"]
    ordering = ["name"]

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