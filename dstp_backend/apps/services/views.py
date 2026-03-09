from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ServiceCategory, Service, ServiceFeature
from .serializers import ServiceCategorySerializer, ServiceSerializer, ServiceFeatureSerializer

class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    

class ServiceFeatureViewSet(viewsets.ModelViewSet):
    queryset = ServiceFeature.objects.all()
    serializer_class = ServiceFeatureSerializer
    permission_classes = [AllowAny]
