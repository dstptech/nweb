from rest_framework import viewsets
from .models import Career
from .serializers import CareerSerializer
from rest_framework.permissions import AllowAny

class CareerViewSet(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer
    permission_classes = [AllowAny]  # keep public until JWT ready
