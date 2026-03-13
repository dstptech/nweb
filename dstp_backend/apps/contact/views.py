from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import Contact
from .serializers import ContactSerializer

@extend_schema_view(
    create=extend_schema(auth=[], description="Public: Submit contact form"),
    list=extend_schema(description="Editor/Admin: List all contacts"),
    retrieve=extend_schema(description="Editor/Admin: Retrieve a contact"),
    update=extend_schema(description="Editor/Admin: Update contact"),
    partial_update=extend_schema(description="Editor/Admin: Partial update contact"),
    destroy=extend_schema(description="Admin only: Delete contact"),
)
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["email", "submitted_on"]
    search_fields = ["name", "email", "message"]
    ordering_fields = ["submitted_on", "name"]
    ordering = ["-submitted_on"]

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action in ['list', 'retrieve', 'update', 'partial_update']:
            permission_classes = [IsEditor]
        elif self.action == 'destroy':
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [perm() for perm in permission_classes]