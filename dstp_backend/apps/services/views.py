from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import ServiceCategory, Service, ServiceFeature
from .serializers import (
    ServiceCategorySerializer,
    ServiceSerializer,
    ServiceFeatureSerializer,
)
 
 
# ── Service Categories ────────────────────────────────────────────────────────
 
@extend_schema_view(
    list=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Services"],
        summary="List all service categories (public)",
        description="Returns all service categories. No authentication required.",
    ),
    retrieve=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Services"],
        summary="Get a service category by ID (public)",
        description="Returns a single service category.",
    ),
    create=extend_schema(
        tags=["Services"],                              # 🔒 locked — no auth=[]
        summary="Create a service category (Editor/Admin)",
        description="Creates a new service category. Requires Editor or Admin role.",
    ),
    update=extend_schema(
        tags=["Services"],
        summary="Update a service category (Editor/Admin)",
        description="Full update of a service category.",
    ),
    partial_update=extend_schema(
        tags=["Services"],
        summary="Partial update a service category (Editor/Admin)",
        description="Update specific fields of a service category.",
    ),
    destroy=extend_schema(
        tags=["Services"],
        summary="Delete a service category (Admin only)",
        description="Permanently deletes a service category. Requires Admin role.",
    ),
)
class ServiceCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceCategorySerializer
    queryset         = ServiceCategory.objects.all()
 
    # ✅ FIXED — filter_backends was missing entirely
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
        return [p() for p in permission_classes]
 
 
# ── Services ──────────────────────────────────────────────────────────────────
 
@extend_schema_view(
    list=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Services"],
        summary="List all services (public)",
        description="Returns all services offered. No authentication required.",
    ),
    retrieve=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Services"],
        summary="Get a service by ID (public)",
        description="Returns a single service with its features.",
    ),
    create=extend_schema(
        tags=["Services"],
        summary="Create a service (Editor/Admin)",
        description="Creates a new service entry. Requires Editor or Admin role.",
    ),
    update=extend_schema(
        tags=["Services"],
        summary="Update a service (Editor/Admin)",
        description="Full update of a service.",
    ),
    partial_update=extend_schema(
        tags=["Services"],
        summary="Partial update a service (Editor/Admin)",
        description="Update specific fields of a service.",
    ),
    destroy=extend_schema(
        tags=["Services"],
        summary="Delete a service (Admin only)",
        description="Permanently deletes a service. Requires Admin role.",
    ),
)
class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    queryset         = Service.objects.all()
 
    # ✅ FIXED — filter_backends was missing entirely
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["category"]
    search_fields    = ["title", "description"]
    ordering_fields  = ["title"]
    ordering         = ["title"]
 
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [AllowAny]
        elif self.action in ["create", "update", "partial_update"]:
            permission_classes = [IsEditor]
        elif self.action == "destroy":
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [p() for p in permission_classes]
 
 
# ── Service Features ──────────────────────────────────────────────────────────
 
@extend_schema_view(
    list=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Services"],
        summary="List all service features (public)",
        description="Returns all service features. No authentication required.",
    ),
    retrieve=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Services"],
        summary="Get a service feature by ID (public)",
        description="Returns a single service feature.",
    ),
    create=extend_schema(
        tags=["Services"],
        summary="Create a service feature (Editor/Admin)",
        description="Creates a new feature for a service.",
    ),
    update=extend_schema(
        tags=["Services"],
        summary="Update a service feature (Editor/Admin)",
        description="Full update of a service feature.",
    ),
    partial_update=extend_schema(
        tags=["Services"],
        summary="Partial update a service feature (Editor/Admin)",
        description="Update specific fields of a service feature.",
    ),
    destroy=extend_schema(
        tags=["Services"],
        summary="Delete a service feature (Admin only)",
        description="Permanently deletes a service feature. Requires Admin role.",
    ),
)
class ServiceFeatureViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceFeatureSerializer
    queryset         = ServiceFeature.objects.all()

    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["service"]       # ✅ unchanged — correct
    search_fields    = ["feature"]       # ✅ FIXED — only real field
    ordering_fields  = ["feature"]       # ✅ FIXED — only real field
    ordering         = ["feature"]       # ✅ FIXED — only real field
 
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [AllowAny]
        elif self.action in ["create", "update", "partial_update"]:
            permission_classes = [IsEditor]
        elif self.action == "destroy":
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [p() for p in permission_classes]