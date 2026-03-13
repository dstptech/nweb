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


# Register
# POST /api/v1/auth/register/


class RegisterView(APIView):

    permission_classes = [AllowAny]  # anyone can register, no login required

    def post(self, request):

        # step 1 — validate the incoming data
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'message': 'Registration failed.',
                'errors':  serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        # step 2 — call service to create the user
        try:
            user, tokens = AuthService.register_user(**serializer.validated_data)
        except ConflictError as e:
            return Response({
                'success': False,
                'message': str(e.detail)
            }, status=status.HTTP_400_BAD_REQUEST)

        # step 3 — send back user info + tokens
        return Response({
            'success': True,
            'message': 'Account created successfully.',
            'data': {
                'user':   UserSerializer(user).data,
                'tokens': tokens,
            }
        }, status=status.HTTP_201_CREATED)



# Login   POST /api/v1/auth/login/

class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'errors':  serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user, tokens = AuthService.login_user(
                email    = serializer.validated_data['email'],
                password = serializer.validated_data['password'],
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
                'user':   UserSerializer(user).data,
                'tokens': tokens,
            }
        })


# LOGOUT POST /api/v1/auth/logout

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]  # Must be Logged in to log out

    def post(self, request):
        refresh_token = request.data.get('refresh')

        if not refresh_token:
            return Response({
                'success': False,
                'message': 'Please send your refresh token'
            }, status=status.HTTP_400_BAD_REQUEST)

        AuthService.logout_user(refresh_token)

        return Response({
            'success': True,
            'message': 'Logged out successfully'
        })


# Refresh Token
# POST /api/v1/auth/refresh

class RefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh')

        if not refresh_token:
            return Response({
                'success': False,
                'message': 'Please send your Refresh token'
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
        })


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
