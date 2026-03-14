from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import Industry
from .serializers import IndustrySerializer
 
 
@extend_schema_view(
    list=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Industries"],
        summary="List all industries (public)",
        description="Returns all industries. No authentication required.",
    ),
    retrieve=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Industries"],
        summary="Get an industry by ID (public)",
        description="Returns a single industry record.",
    ),
    create=extend_schema(
        tags=["Industries"],
        summary="Create an industry (Editor/Admin)",
        description="Creates a new industry entry.",
    ),
    update=extend_schema(
        tags=["Industries"],
        summary="Update an industry (Editor/Admin)",
        description="Full update of an industry.",
    ),
    partial_update=extend_schema(
        tags=["Industries"],
        summary="Partial update an industry (Editor/Admin)",
        description="Update specific fields of an industry.",
    ),
    destroy=extend_schema(
        tags=["Industries"],
        summary="Delete an industry (Admin only)",
        description="Permanently deletes an industry. Requires Admin role.",
    ),
)
class IndustryViewSet(viewsets.ModelViewSet):
    serializer_class = IndustrySerializer
    queryset         = Industry.objects.all()
 
    # ✅ FIXED — filter_backends was completely missing
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["name"]
    search_fields    = ["name", "description"]
    ordering_fields  = ["name"]
    ordering         = ["name"]
 
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