from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import Career
from .serializers import CareerSerializer


@extend_schema_view(
    list=extend_schema(
        auth=[],                                        # ✅ 🔓 unlocked in Swagger
        tags=["Careers"],
        summary="List all job openings (public)",
        description="Returns all active career listings. No authentication required.",
    ),
    retrieve=extend_schema(
        auth=[],                                        # ✅ 🔓 unlocked
        tags=["Careers"],
        summary="Get a single job opening (public)",
        description="Returns a single career listing by ID.",
    ),
    create=extend_schema(
        tags=["Careers"],                               # 🔒 locked — no auth=[]
        summary="Create a job opening (Editor/Admin)",
        description="Creates a new career listing. Requires Editor or Admin role.",
    ),
    update=extend_schema(
        tags=["Careers"],
        summary="Update a job opening (Editor/Admin)",
        description="Full update of a career listing.",
    ),
    partial_update=extend_schema(
        tags=["Careers"],
        summary="Partial update a job opening (Editor/Admin)",
        description="Update specific fields of a career listing.",
    ),
    destroy=extend_schema(
        tags=["Careers"],
        summary="Delete a job opening (Admin only)",
        description="Permanently deletes a career listing. Requires Admin role.",
    ),
)
class CareerViewSet(viewsets.ModelViewSet):
    serializer_class = CareerSerializer
    queryset         = Career.objects.all()

    # ✅ FIXED — added SearchFilter and OrderingFilter (were missing)
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["location", "posted_on"]
    search_fields    = ["title", "description", "location"]
    ordering_fields  = ["posted_on", "title"]
    ordering         = ["-posted_on"]

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