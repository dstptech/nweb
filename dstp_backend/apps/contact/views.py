from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin, IsEditor
from .models import Contact
from .serializers import ContactSerializer
 
 
@extend_schema_view(
    create=extend_schema(
        auth=[],                                        # ✅ 🔓 unlocked — public form submission
        tags=["Contact"],
        summary="Submit a contact form (public)",
        description="Anyone can submit a contact inquiry. No authentication required.",
    ),
    list=extend_schema(
        tags=["Contact"],                               # 🔒 locked
        summary="List all contact submissions (Editor/Admin)",
        description="Returns all submitted contact messages.",
    ),
    retrieve=extend_schema(
        tags=["Contact"],
        summary="Get a single contact submission (Editor/Admin)",
        description="Returns a single contact message by ID.",
    ),
    update=extend_schema(
        tags=["Contact"],
        summary="Update a contact submission (Editor/Admin)",
        description="Full update of a contact record.",
    ),
    partial_update=extend_schema(
        tags=["Contact"],
        summary="Partial update a contact submission (Editor/Admin)",
        description="Update specific fields of a contact record.",
    ),
    destroy=extend_schema(
        tags=["Contact"],
        summary="Delete a contact submission (Admin only)",
        description="Permanently deletes a contact submission. Requires Admin role.",
    ),
)
class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    queryset         = Contact.objects.all()
 
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["email", "submitted_on"]
    search_fields    = ["name", "email", "message"]
    ordering_fields  = ["submitted_on", "name"]
    ordering         = ["-submitted_on"]
 
    def get_permissions(self):
        if self.action == "create":
            permission_classes = [AllowAny]
        elif self.action in ["list", "retrieve", "update", "partial_update"]:
            permission_classes = [IsEditor]
        elif self.action == "destroy":
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [perm() for perm in permission_classes]