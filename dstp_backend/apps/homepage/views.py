from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import Homepage
from .serializers import HomepageSerializer
 
 
@extend_schema_view(
    list=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Homepage"],
        summary="Get homepage content (public)",
        description="Returns all homepage section data for the frontend.",
    ),
    retrieve=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Homepage"],
        summary="Get a homepage section (public)",
        description="Returns a single homepage section by ID.",
    ),
    create=extend_schema(
        tags=["Homepage"],
        summary="Create homepage content (Editor/Admin)",
        description="Creates a homepage section. Requires Editor or Admin role.",
    ),
    update=extend_schema(
        tags=["Homepage"],
        summary="Update homepage content (Editor/Admin)",
        description="Full update of a homepage section.",
    ),
    partial_update=extend_schema(
        tags=["Homepage"],
        summary="Partial update homepage content (Editor/Admin)",
        description="Update specific fields of a homepage section.",
    ),
    destroy=extend_schema(
        tags=["Homepage"],
        summary="Delete homepage content (Admin only)",
        description="Permanently deletes a homepage section. Requires Admin role.",
    ),
)
class HomepageViewSet(viewsets.ModelViewSet):
    serializer_class = HomepageSerializer
    queryset         = Homepage.objects.all()
 
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [AllowAny]
        elif self.action in ["create", "update", "partial_update"]:
            permission_classes = [IsEditor]         # ✅ FIXED — was IsAuthenticated
        elif self.action == "destroy":
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [perm() for perm in permission_classes]