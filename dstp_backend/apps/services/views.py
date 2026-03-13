from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import ServiceCategory, Service, ServiceFeature
from .serializers import ServiceCategorySerializer, ServiceSerializer, ServiceFeatureSerializer

# -----------------------------
# Service Categories
# -----------------------------
@extend_schema_view(
    list=extend_schema(auth=None, description="Public: List service categories"),
    retrieve=extend_schema(auth=None, description="Public: Retrieve a single service category"),
    create=extend_schema(description="Editor/Admin: Create a service category"),
    update=extend_schema(description="Editor/Admin: Update a service category"),
    partial_update=extend_schema(description="Editor/Admin: Partial update a service category"),
    destroy=extend_schema(description="Admin only: Delete a service category"),
)
class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer

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

# -----------------------------
# Services
# -----------------------------
@extend_schema_view(
    list=extend_schema(auth=None, description="Public: List services"),
    retrieve=extend_schema(auth=None, description="Public: Retrieve a single service"),
    create=extend_schema(description="Editor/Admin: Create a service"),
    update=extend_schema(description="Editor/Admin: Update a service"),
    partial_update=extend_schema(description="Editor/Admin: Partial update a service"),
    destroy=extend_schema(description="Admin only: Delete a service"),
)
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

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

# -----------------------------
# Service Features
# -----------------------------
@extend_schema_view(
    list=extend_schema(auth=None, description="Public: List service features"),
    retrieve=extend_schema(auth=None, description="Public: Retrieve a single service feature"),
    create=extend_schema(description="Editor/Admin: Create a service feature"),
    update=extend_schema(description="Editor/Admin: Update a service feature"),
    partial_update=extend_schema(description="Editor/Admin: Partial update a service feature"),
    destroy=extend_schema(description="Admin only: Delete a service feature"),
)
class ServiceFeatureViewSet(viewsets.ModelViewSet):
    queryset = ServiceFeature.objects.all()
    serializer_class = ServiceFeatureSerializer

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