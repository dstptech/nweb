from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Blog
from .serializers import BlogSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]

    # Enable filters, search, ordering
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    # Exact field filters
    filterset_fields = ["author", "published_on"]

    # Keyword search
    search_fields = ["title", "content", "author"]

    # Sorting
    ordering_fields = ["published_on", "title"]
    ordering = ["-published_on"]  # default: newest first
