from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import Career
from .serializers import CareerSerializer

@extend_schema_view(
    list=extend_schema(auth=[], description="Public: List all careers"),
    retrieve=extend_schema(auth=[], description="Public: Retrieve a career by ID"),
    create=extend_schema(description="Editor/Admin: Create a new career"),
    update=extend_schema(description="Editor/Admin: Update a career"),
    partial_update=extend_schema(description="Editor/Admin: Partial update a career"),
    destroy=extend_schema(description="Admin only: Delete a career"),
)
class CareerViewSet(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["location", "posted_on"]
    search_fields = ["title", "description", "location"]
    ordering_fields = ["posted_on", "title"]
    ordering = ["-posted_on"]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        elif self.action in ['create', 'update', 'partial_update']:
            permission_classes = [IsEditor]
        elif self.action == 'destroy':
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [perm() for perm in permission_classes]