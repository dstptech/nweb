
"""Authentication Serializers

Data validation layer for authentication endpoints.

DRF Serializers perform two key functions:
- Deserialization: Incoming JSON → Python objects (with validation)
- Serialization: Python objects → JSON (for responses)

All serializers include field-level and object-level validation to ensure
data integrity before reaching the business logic layer.
"""

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password

from .models import CustomUser, UserProfile
from .validators import validate_email_domain, validate_name, validate_phone_number


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for UserProfile model (read-only output)."""
    
    class Meta:
        model = UserProfile
        fields = ['bio', 'avatar', 'designation']


class UserSerializer(serializers.ModelSerializer):
    """
    User data serializer for read-only output.
    
    Includes related profile data and computed full_name field.
    Used whenever user data is sent to the client.
    """
    profile = UserProfileSerializer(read_only=True)  # Nested related object
    full_name = serializers.SerializerMethodField()  # Computed field

    class Meta:
        model = CustomUser
        fields = [
            'id', 'email', 'first_name', 'last_name',
            'full_name', 'role', 'is_verified',
            'date_joined', 'profile'
        ]
        read_only_fields = ['id', 'email', 'role', 'is_verified', 'date_joined']

    def get_full_name(self, obj):
        """Compute full name from first and last name."""
        return obj.get_full_name()


class RegisterSerializer(serializers.Serializer):
    """
    Validates user registration input.
    
    Not a ModelSerializer because we want fine-grained control
    over which fields are accepted during registration.
    """
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    password = serializers.CharField(write_only=True, min_length=8)

    def validate_email(self, value):
        """Validate email domain, normalize to lowercase, and check uniqueness."""
        validate_email_domain(value)
        value_lower = value.lower()
        
        # Check if email already exists (serializer-level validation)
        from .models import CustomUser
        if CustomUser.objects.filter(email=value_lower).exists():
            raise serializers.ValidationError("This email address is already registered.")
        
        return value_lower

    def validate_first_name(self, value):
        """Validate name format and strip whitespace."""
        validate_name(value)
        return value.strip()

    def validate_last_name(self, value):
        """Validate name format and strip whitespace."""
        validate_name(value)
        return value.strip()

    def validate_password(self, value):
        """Validate password meets security requirements."""
        validate_password(value)
        return value


class LoginSerializer(serializers.Serializer):
    """
    Validates login credentials (email and password).
    
    Actual authentication happens in AuthService.login_user().
    This serializer only validates format.
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        """Normalize email to lowercase."""
        return value.lower()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Extends JWT token to include custom claims.
    
    Adds email, role, and full name to token payload so frontend
    can access user info without additional API calls.
    """
    
    @classmethod
    def get_token(cls, user):
        """Add custom claims to JWT token."""
        token = super().get_token(user)
        # Add user metadata to token payload
        token['email'] = user.email
        token['role'] = user.role
        token['name'] = user.get_full_name()
        return token


class PasswordResetRequestSerializer(serializers.Serializer):
    """Validates email for password reset request."""
    email = serializers.EmailField()

    def validate_email(self, value):
        """Normalize email to lowercase."""
        return value.lower()


class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Validates password reset confirmation input.
    
    Includes reset token and new password, both validated.
    """
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_new_password(self, value):
        """Validate new password meets security requirements."""
        validate_password(value)
        return value


class UpdateProfileSerializer(serializers.Serializer):
    """
    Validates user profile update input.
    
    All fields are optional to support partial updates (PATCH).
    Note: Only fields that exist in CustomUser model are supported.
    """
    first_name = serializers.CharField(max_length=70, required=False)
    last_name = serializers.CharField(max_length=100, required=False)

    def validate_first_name(self, value):
        """Validate name format and strip whitespace."""
        validate_name(value)
        return value.strip()

    def validate_last_name(self, value):
        """Validate name format and strip whitespace."""
        validate_name(value)
        return value.strip()