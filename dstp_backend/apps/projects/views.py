from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.permissions import AllowAny

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["client", "completed_on"]  # filter by client or date
    
    filterset_fields = ["client", "completed_on"]
    search_fields = ["title", "description", "client"]
    ordering_fields = ["completed_on", "title"]
    ordering = ["-completed_on"]

