
from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    # only admin role users can access
    message = "Only administrators can do this."

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            (request.user.role == 'admin' or request.user.is_superuser)  # Check both role and superuser
        )


class IsEditor(BasePermission):
    # admins and editors can access, viewers cannot
    message = "You need editor or admin access to do this."

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in ('admin', 'editor')
        )


class IsViewer(BasePermission):
    # any logged in user can access
    message = "You must be logged in."

    def has_permission(self, request, view):
        return request.user.is_authenticated