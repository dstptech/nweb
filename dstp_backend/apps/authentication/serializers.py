
# It handls Incoming JSON -> validate -> PythonObjects (deserialization)
# Python Objects -> JSON


# apps/authentication/serializers.py
# ─────────────────────────────────────────────────────────────────────────────
# In a Nutshell Used For Validatiom
#
# DRF serializers do the same job BUT for JSON APIs:
#   - incoming JSON  → validate → Python objects  (deserialization)
#   - Python objects → JSON                       (serialization)
#
#
# ─────────────────────────────────────────────────────────────────────────────

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password

from .models import CustomUser, UserProfile
from .validators import validate_email_domain, validate_name, validate_phone_number


# ── UserProfile Serializer ────────────────────────────────────────────────────

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model  = UserProfile
        fields = ['bio', 'avatar', 'designation']


# ── User (read-only, for returning user data) ─────────────────────────────────

class UserSerializer(serializers.ModelSerializer):
    """
    Used to SEND user data back to the client.
    read_only=True — this serializer is for output, not input.
    """
    profile    = UserProfileSerializer(read_only=True)  # nested — same concept as related_name
    full_name  = serializers.SerializerMethodField()     # computed field, not in model

    class Meta:
        model  = CustomUser
        fields = [
            'id', 'email', 'first_name', 'last_name',
            'full_name', 'role', 'is_verified',
            'date_joined', 'profile'
        ]
        read_only_fields = ['id', 'email', 'role', 'is_verified', 'date_joined']

    def get_full_name(self, obj):
        # SerializerMethodField calls get_<fieldname> automatically
        return obj.get_full_name()


# ── Register Serializer ───────────────────────────────────────────────────────
# Like your RegisterForm(UserCreationForm) — validates new user data

class RegisterSerializer(serializers.Serializer):
    """
    Validates registration input.
    Notice: NOT a ModelSerializer — we control exactly what fields come in.
    """
    email      = serializers.EmailField()
    first_name = serializers.CharField(max_length=50)
    last_name  = serializers.CharField(max_length=50)
    password   = serializers.CharField(write_only=True, min_length=8)
    # write_only=True → password never comes back in the response (important!)

    def validate_email(self, value):
        # field-level validation — runs automatically for each field
        # DRF calls validate_<fieldname>() just like Django Forms
        validate_email_domain(value)      # our custom validator
        return value.lower()              # normalise to lowercase

    def validate_first_name(self, value):
        validate_name(value)
        return value.strip()

    def validate_last_name(self, value):
        validate_name(value)
        return value.strip()

    def validate_password(self, value):
        # runs Django's full password validator suite (set in settings)
        validate_password(value)
        return value


# ── Login Serializer
#  — validates login credentials

class LoginSerializer(serializers.Serializer):
    """
    Just accepts email + password. Actual authentication happens in the service.
    """
    email    = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        return value.lower()


# ── Token Serializer ──────────────────────────────────────────────────────────
# Customises what extra data gets baked INTO the JWT token payload

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Adds user's role and email to the token payload.
    When the frontend decodes the JWT they can see role without an extra API call.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # add custom claims to the token
        token['email'] = user.email
        token['role']  = user.role
        token['name']  = user.get_full_name()
        return token


# ── Password Reset Serializers ────────────────────────────────────────────────

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        return value.lower()


class PasswordResetConfirmSerializer(serializers.Serializer):
    token        = serializers.CharField()
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_new_password(self, value):
        validate_password(value)
        return value


# ── Update Profile Serializer ─────────────────────────────────────────────────

class UpdateProfileSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=50, required=False)
    last_name  = serializers.CharField(max_length=50, required=False)
    phone      = serializers.CharField(max_length=15, required=False)

    def validate_first_name(self, value):
        validate_name(value)
        return value.strip()

    def validate_last_name(self, value):
        validate_name(value)
        return value.strip()

    def validate_phone(self, value):
        validate_phone_number(value)
        return value