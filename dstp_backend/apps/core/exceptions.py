"""DSTP Backend — Custom Exception Handler"""
from rest_framework.views import exception_handler
from django.http import JsonResponse


def custom_exception_handler(exc, context):
    """Custom exception handler that wraps DRF's default handler."""
    response = exception_handler(exc, context)
    
    if response is not None:
        response.data['status_code'] = response.status_code
    
    return response


def bad_request_handler(request, exception=None):
    """Handle 400 Bad Request errors."""
    return JsonResponse({'error': 'Bad Request', 'status_code': 400}, status=400)


def permission_denied_handler(request, exception=None):
    """Handle 403 Forbidden errors."""
    return JsonResponse({'error': 'Permission Denied', 'status_code': 403}, status=403)


def not_found_handler(request, exception=None):
    """Handle 404 Not Found errors."""
    return JsonResponse({'error': 'Not Found', 'status_code': 404}, status=404)


def server_error_handler(request):
    """Handle 500 Internal Server errors."""
    return JsonResponse({'error': 'Internal Server Error', 'status_code': 500}, status=500)
