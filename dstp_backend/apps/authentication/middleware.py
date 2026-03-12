import logging
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

logger = logging.getLogger(__name__)

class JWTAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.jwt_auth     = JWTAuthentication()
        # this print runs once when server starts
        print("JWTAuthMiddleware loaded")

    def __call__(self, request):
        # before The View Runs
        self.attach_user_to_request(request)
        # Run the view
        response = self.get_response(request)
        # after The View Runs
        return response

    def attach_user_to_request(self, request):
        # Read The authorization header From Request
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        # Only Process it if it starts with Bearer
        if not auth_header.startswith('Bearer'):
            return  # No token
        try:
            result = self.jwt_auth.authenticate(request)
            if result:
                user, token = result
                request.user = user
        except (InvalidToken, TokenError):
            # bad token — log it but don't crash, permission classes will handle it
            logger.warning(f"Bad JWT token from {request.META.get('REMOTE_ADDR')}")

