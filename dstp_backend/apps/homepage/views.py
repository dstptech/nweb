from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema_view, extend_schema
from apps.authentication.permissions import IsAdmin
from .models import Homepage
from .serializers import HomepageSerializer

@extend_schema_view(
    list=extend_schema(auth=None, description="Public: View homepage content"),
    retrieve=extend_schema(auth=None, description="Public: Retrieve homepage section"),
    create=extend_schema(description="Authenticated users: Create homepage content"),
    update=extend_schema(description="Authenticated users: Update homepage content"),
    partial_update=extend_schema(description="Authenticated users: Partial update homepage"),
    destroy=extend_schema(description="Admin only: Delete homepage content"),
)
class HomepageViewSet(viewsets.ModelViewSet):
    queryset = Homepage.objects.all()
    serializer_class = HomepageSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [AllowAny]
        elif self.action in ["create", "update", "partial_update"]:
            permission_classes = [IsAuthenticated]
        elif self.action == "destroy":
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [perm() for perm in permission_classes]