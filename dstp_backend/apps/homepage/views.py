from rest_framework import viewsets
from .models import Homepage
from .serializers import HomepageSerializer
from rest_framework.permissions import AllowAny

class HomepageViewSet(viewsets.ModelViewSet):
    queryset = Homepage.objects.all()
    serializer_class = HomepageSerializer
    permission_classes = [AllowAny]  # public for frontend
