from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from apps.authentication.permissions import IsAdmin, IsEditor
from drf_spectacular.utils import extend_schema_view, extend_schema
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Blog
from .serializers import BlogSerializer


@extend_schema_view(
    list=extend_schema(
        auth=[],
        summary="List all published blogs",      # ✅ add summary
        tags=["Blog"],                            # ✅ add tags
        description="Public: Returns paginated list of blogs"
    ),
    retrieve=extend_schema(
        auth=[],
        summary="Get single blog post",
        tags=["Blog"],
        description="Public: Retrieve a single blog by ID"
    ),
    create=extend_schema(
        summary="Create a blog post",
        tags=["Blog"],
        description="Editor/Admin only: Create a new blog post"
    ),
    update=extend_schema(
        summary="Update a blog post",
        tags=["Blog"],
        description="Editor/Admin only: Full update"
    ),
    partial_update=extend_schema(
        summary="Partial update a blog post",
        tags=["Blog"],
        description="Editor/Admin only: Update specific fields"
    ),
    destroy=extend_schema(
        summary="Delete a blog post",
        tags=["Blog"],
        description="Admin only: Permanently delete a blog"
    ),
)
class BlogViewSet(viewsets.ModelViewSet):
    serializer_class = BlogSerializer

    # ✅ Fix 1 — filter published only for public,
    #    override in get_queryset based on role
    def get_queryset(self):
        user = self.request.user
        if user and user.is_authenticated and user.is_staff:
            return Blog.objects.all()           # admin sees all drafts too
        return Blog.objects.filter(is_published=True)  # public sees published only

    # ✅ Fix 2 — add filters (matches your API spec)
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["author"]
    search_fields    = ["title", "content"]
    ordering_fields  = ["published_on"]
    ordering         = ["-published_on"]

    # ✅ Your permission logic is correct — no changes needed
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [AllowAny]
        elif self.action in ["create", "update", "partial_update"]:
            permission_classes = [IsEditor]
        elif self.action == "destroy":
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]