from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from apps.authentication.permissions import IsAdmin, IsEditor
from drf_spectacular.utils import extend_schema_view, extend_schema
from .models import Blog
from .serializers import BlogSerializer

@extend_schema_view(
    list=extend_schema(auth=[], description="Public: List blogs"),
    retrieve=extend_schema(auth=[], description="Public: Retrieve a blog"),
    create=extend_schema(description="Editor/Admin only: Create a blog"),
    update=extend_schema(description="Editor/Admin only: Update a blog"),
    partial_update=extend_schema(description="Editor/Admin only: Partial update"),
    destroy=extend_schema(description="Admin only: Delete a blog"),
)
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_permissions(self):
        """Action-based permission control"""
        if self.action in ["list", "retrieve"]:
            permission_classes = [AllowAny]       # PUBLIC
        elif self.action in ["create", "update", "partial_update"]:
            permission_classes = [IsEditor]       # EDITOR / ADMIN
        elif self.action == "destroy":
            permission_classes = [IsAdmin]        # ADMIN ONLY
        else:
            permission_classes = [IsAuthenticated]  # fallback

        # Important: **return instances**, not classes
        return [permission() for permission in permission_classes]