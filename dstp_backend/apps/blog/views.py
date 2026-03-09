from rest_framework import viewsets
from .models import Blog
from .serializers import BlogSerializer
from rest_framework.permissions import AllowAny
from rest_framework.filters import OrderingFilter

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by("-published_on")
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]  # public for frontend
    
    filter_backends = [OrderingFilter]
    ordering_fields = ["published_on", "title"]
    ordering = ["-published_on"]  # default: newest first
