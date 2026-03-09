from rest_framework import viewsets
from .models import Industry
from .serializers import IndustrySerializer
from rest_framework.permissions import AllowAny

class IndustryViewSet(viewsets.ModelViewSet):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer
    permission_classes = [AllowAny]  # public for frontend
