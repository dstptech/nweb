"""Authentication REST API Views

REST endpoints for user authentication operations:
- User registration
- Login with credentials
- Logout (token revocation)
- Token refresh
- Get/update user profile
- Password reset workflow
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserSerializer,
    UpdateProfileSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
)
from .services import AuthService
from .permissions import IsAdmin
from utils.exceptions import (
    AuthenticationFailedError,
    UserNotFoundError,
    ValidationError,
    ConflictError,
)


class RegisterView(APIView):
    """Create new user account.
    
    POST /api/v1/auth/register/
    
    Input:
        {
            "email": "user@example.com",
            "password": "SecurePass123!",
            "first_name": "John",
            "last_name": "Doe"
        }
        
    Returns:
        {
            "success": true,
            "message": "Account created successfully.",
            "data": {
                "user": {...},
                "tokens": {"access": "...", "refresh": "..."}
            }
        }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """Register a new user account."""
        # Validate incoming data
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'message': 'Registration failed.',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create user via service layer
        try:
            user, tokens = AuthService.register_user(**serializer.validated_data)
        except ConflictError as e:
            return Response({
                'success': False,
                'message': str(e.detail)
            }, status=status.HTTP_400_BAD_REQUEST)

        # Return user info + JWT tokens
        return Response({
            'success': True,
            'message': 'Account created successfully.',
            'data': {
                'user': UserSerializer(user).data,
                'tokens': tokens,
            }
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """Authenticate user with email and password.
    
    POST /api/v1/auth/login/
    
    Input:
        {
            "email": "user@example.com",
            "password": "SecurePass123!"
        }
        
    Returns:
        {
            "success": true,
            "message": "Login successful.",
            "data": {
                "user": {...},
                "tokens": {"access": "...", "refresh": "..."}
            }
        }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """Authenticate and return JWT tokens."""
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user, tokens = AuthService.login_user(
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password'],
            )
        except AuthenticationFailedError as e:
            return Response({
                'success': False,
                'message': str(e.detail)
            }, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            'success': True,
            'message': 'Login successful.',
            'data': {
                'user': UserSerializer(user).data,
                'tokens': tokens,
            }
        }, status=status.HTTP_200_OK)


class LogoutView(APIView):
    """Revoke refresh token and logout user.
    
    POST /api/v1/auth/logout/
    
    Input:
        {
            "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
        }
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Revoke refresh token to logout."""
        refresh_token = request.data.get('refresh')

        if not refresh_token:
            return Response({
                'success': False,
                'message': 'Refresh token required'
            }, status=status.HTTP_400_BAD_REQUEST)

        AuthService.logout_user(refresh_token)

        return Response({
            'success': True,
            'message': 'Logged out successfully'
        }, status=status.HTTP_200_OK)


class RefreshView(APIView):
    """Get new access token using refresh token.
    
    POST /api/v1/auth/refresh/
    
    Input:
        {
            "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
        }
        
    Returns:
        {
            "success": true,
            "data": {"access": "eyJ0eXAiOiJKV1QiLCJhbGc..."}
        }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """Generate new access token."""
        refresh_token = request.data.get('refresh')

        if not refresh_token:
            return Response({
                'success': False,
                'message': 'Refresh token required'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            new_access_token = AuthService.refresh_access_token(refresh_token)
        except AuthenticationFailedError as e:
            return Response({
                'success': False,
                'message': str(e.detail)
            }, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            'success': True,
            'data': {'access': new_access_token}
        }, status=status.HTTP_200_OK)


class MeView(APIView):
    """Get current authenticated user's profile.
    
    GET /api/v1/auth/me/
    
    Returns:
        {
            "success": true,
            "data": {...user profile...}
        }
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Return current user's profile."""
        return Response({
            'success': True,
            'data': UserSerializer(request.user).data
        }, status=status.HTTP_200_OK)


class UpdateProfileView(APIView):
    """Update current user's profile information.
    
    PATCH /api/v1/auth/me/update/
    
    Input (all fields optional):
        {
            "first_name": "Johnny",
            "last_name": "Doeson"
        }
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        """Update user profile (partial update)."""
        # Partial=True allows partial updates (not all fields required)
        serializer = UpdateProfileSerializer(data=request.data, partial=True)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        # Update user fields using serializer-validated data
        user = request.user
        for field, value in serializer.validated_data.items():
            if hasattr(user, field):  # Safety check that field exists on model
                setattr(user, field, value)
        user.full_clean()  # Run model-level validation
        user.save()

        return Response({
            'success': True,
            'message': 'Profile updated successfully',
            'data': UserSerializer(user).data
        }, status=status.HTTP_200_OK)


class PasswordResetRequestView(APIView):
    """Request password reset token via email.
    
    Step 1 of password reset workflow.
    
    POST /api/v1/auth/password-reset/
    
    Input:
        {
            "email": "user@example.com"
        }
    
    Note: Always returns success (doesn't leak if email exists in system)
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """Request password reset token."""
        serializer = PasswordResetRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            AuthService.request_password_reset(serializer.validated_data['email'])
        except Exception as e:
            # Log the error but don't expose to user
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Error sending password reset email: {str(e)}")
            # Still return success to user for security

        # Always return success (don't leak whether email exists in system)
        return Response({
            'success': True,
            'message': 'If this email is registered, a reset token has been sent.'
        }, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    """Reset password using token and new password.
    
    Step 2 of password reset workflow.
    
    POST /api/v1/auth/password-reset/confirm/
    
    Input:
        {
            "token": "abc123xyz...",
            "new_password": "NewPass123!"
        }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """Confirm password reset with token."""
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            AuthService.confirm_password_reset(
                token_string=serializer.validated_data['token'],
                new_password=serializer.validated_data['new_password'],
            )
        except ValidationError as e:
            return Response({
                'success': False,
                'message': str(e.detail)
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'success': True,
            'message': 'Password reset successfully. Please login with your new password.'
        }, status=status.HTTP_200_OK)
# Get my Profile
# GET /api/v1/auth/me/

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'success': True,
            'data': UserSerializer(request.user).data
        })


# Update My Profile
# PATCH /api/v1/auth/me/update/

class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        # User can send just one field not all fields required
        serializer = UpdateProfileSerializer(data=request.data, partial=True)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        # Update only the fields that were sent
        user = request.user
        for field, value in serializer.validated_data.items():
            setattr(user, field, value)
        user.save()

        return Response({
            'success': True,
            'message': 'Profile Updated',
            'data': UserSerializer(user).data
        })


# Forgot password — step 1: request reset link
# POST /api/v1/auth/password-reset/

class PasswordResetRequestView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = PasswordResetRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'success': False, 'errors': serializer.errors}, status=400)

        AuthService.request_password_reset(serializer.validated_data['email'])

        # always return success — don't tell caller if email exists in system
        return Response({
            'success': True,
            'message': 'If this email is registered, a reset token has been sent.'
        })


# Forgot password — step 2: submit token + new password
# POST /api/v1/auth/password-reset/confirm/

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'success': False, 'errors': serializer.errors}, status=400)

        try:
            AuthService.confirm_password_reset(
                token_string=serializer.validated_data['token'],
                new_password=serializer.validated_data['new_password'],
            )
        except ValidationError as e:
            return Response({'success': False, 'message': str(e.detail)}, status=400)

        return Response({
            'success': True,
            'message': 'Password Reset Successfully, Please Login with your new Password'
        })
