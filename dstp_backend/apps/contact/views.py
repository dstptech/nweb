from rest_framework import viewsets
from .models import Contact
from .serializers import ContactSerializer
from rest_framework.permissions import AllowAny

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]  # public for now
    
    filterset_fields = ["email", "submitted_on"]
    search_fields = ["name", "email", "message"]
    ordering_fields = ["submitted_on", "name"]
    ordering = ["-submitted_on"]

