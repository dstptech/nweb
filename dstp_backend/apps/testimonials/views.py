from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import Testimonial
from .serializers import TestimonialSerializer
 
 
@extend_schema_view(
    list=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Testimonials"],
        summary="List all testimonials (public)",
        description="Returns all client testimonials. No authentication required.",
    ),
    retrieve=extend_schema(
        auth=[],                                        # ✅ FIXED — was auth=None
        tags=["Testimonials"],
        summary="Get a testimonial by ID (public)",
        description="Returns a single testimonial.",
    ),
    create=extend_schema(
        tags=["Testimonials"],                          # 🔒 locked
        summary="Create a testimonial (Editor/Admin)",
        description="Creates a new testimonial. Requires Editor or Admin role.",
    ),
    update=extend_schema(
        tags=["Testimonials"],
        summary="Update a testimonial (Editor/Admin)",
        description="Full update of a testimonial.",
    ),
    partial_update=extend_schema(
        tags=["Testimonials"],
        summary="Partial update a testimonial (Editor/Admin)",
        description="Update specific fields of a testimonial.",
    ),
    destroy=extend_schema(
        tags=["Testimonials"],
        summary="Delete a testimonial (Admin only)",
        description="Permanently deletes a testimonial. Requires Admin role.",
    ),
)
class TestimonialViewSet(viewsets.ModelViewSet):
    serializer_class = TestimonialSerializer
    queryset         = Testimonial.objects.all()
 
    # ✅ FIXED — filter_backends was missing entirely
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["rating"]
    search_fields    = ["client_name", "feedback"]
    ordering_fields  = ["rating", "client_name"]
    ordering         = ["-rating"]
 
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
 