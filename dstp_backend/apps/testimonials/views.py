from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import Testimonial
from .serializers import TestimonialSerializer

@extend_schema_view(
    list=extend_schema(auth=None, description="Public: List all testimonials"),
    retrieve=extend_schema(auth=None, description="Public: Retrieve testimonial by ID"),
    create=extend_schema(description="Editor/Admin: Create a testimonial"),
    update=extend_schema(description="Editor/Admin: Update a testimonial"),
    partial_update=extend_schema(description="Editor/Admin: Partial update a testimonial"),
    destroy=extend_schema(description="Admin only: Delete a testimonial"),
)
class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

    filterset_fields = ["rating"]
    search_fields = ["client_name", "feedback"]
    ordering_fields = ["rating", "client_name"]
    ordering = ["-rating"]

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