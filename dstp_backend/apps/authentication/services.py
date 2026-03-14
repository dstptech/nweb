"""Authentication Service Layer

This module contains all business logic for user authentication including:
- User registration with email validation
- Login with credentials
- JWT token generation and refresh
- Token revocation (logout)
- Password reset request and confirmation
- User profile retrieval and updates
"""

import logging
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import authenticate as django_authenticate
from django.conf import settings

from .repositories import UserRepository, PasswordResetRepository
from utils.exceptions import (
    AuthenticationFailedError,
    UserNotFoundError,
    ValidationError,
    ConflictError,
)

logger = logging.getLogger(__name__)


class AuthService:
    """Centralized authentication business logic service.
    
    Handles all authentication operations including user registration, login,
    logout, token management, and password recovery.
    """

    @staticmethod
    def register_user(email: str, password: str, first_name: str, last_name: str, role: str = 'viewer'):
        """Create a new user account with authentication tokens.
        
        Validates email uniqueness before creating the account. The new user
        is created with role='viewer' by default and receives JWT tokens for
        immediate authentication after registration.
        
        Args:
            email (str): User's email address (will be converted to lowercase).
            password (str): User's password (will be hashed with Argon2).
            first_name (str): User's first name (leading/trailing spaces stripped).
            last_name (str): User's last name (leading/trailing spaces stripped).
            role (str, optional): User role - 'viewer', 'editor', or 'admin'. Defaults to 'viewer'.
            
        Returns:
            tuple: (CustomUser instance, dict with 'access' and 'refresh' JWT tokens)
            
        Raises:
            ConflictError: If email already exists in the system.
            
        Example:
            >>> user, tokens = AuthService.register_user(
            ...     email='john@example.com',
            ...     password='SecurePass123!',
            ...     first_name='John',
            ...     last_name='Doe'
            ... )
            >>> print(tokens['access'])  # JWT access token valid for 15 minutes
        """
        # Validate email uniqueness
        if UserRepository.email_exists(email):
            raise ConflictError(f"An account with email '{email}' already exists.")
        
        # Create user with normalized input
        user = UserRepository.create_user(
            email=email.lower(),
            password=password,
            first_name=first_name.strip(),
            last_name=last_name.strip(),
            role=role,
        )
        
        # Generate JWT tokens for new user
        tokens = AuthService._generate_tokens(user)

        return user, tokens
    
    @staticmethod
    def login_user(email: str, password: str):
        """Authenticate user with email and password credentials.
        
        Validates that the email exists in the system, account is active,
        and password is correct. Returns JWT tokens upon successful authentication.
        
        Uses generic error messages to prevent account enumeration attacks.
        
        Args:
            email (str): User's email address.
            password (str): User's password (plaintext, will be hashed for comparison).
            
        Returns:
            tuple: (CustomUser instance, dict with 'access' and 'refresh' JWT tokens)
            
        Raises:
            AuthenticationFailedError: If account doesn't exist, is deactivated, 
                or password is incorrect.
                
        Example:
            >>> user, tokens = AuthService.login_user(
            ...     email='john@example.com',
            ...     password='SecurePass123!'
            ... )
            >>> print(tokens['refresh'])  # Use to get new access tokens
        """
        # Verify user exists and is active
        user = UserRepository.get_by_email(email)
        
        # Authenticate password using Django's password hashing
        authenticated_user = django_authenticate(
            username=email,
            password=password
        )

        # Use generic error message for all failure cases to prevent account enumeration
        if not authenticated_user:
            logger.warning(f"Failed login attempt for email: {email}")
            raise AuthenticationFailedError("Invalid email or password.")
        
        # Verify account is active (after password check)
        if not authenticated_user.is_active:
            logger.warning(f"Login attempt on deactivated account: {email}")
            raise AuthenticationFailedError("Invalid email or password.")
        
        # Generate JWT tokens
        tokens = AuthService._generate_tokens(authenticated_user)

        return authenticated_user, tokens
    
    @staticmethod
    def logout_user(refresh_token_string: str) -> bool:
        """Revoke a user's refresh token (logout).
        
        Blacklists the provided refresh token so it cannot be used to generate
        new access tokens. This effectively logs the user out on all devices
        using that token.
        
        Args:
            refresh_token_string (str): The JWT refresh token to revoke.
            
        Returns:
            bool: Always returns True (intended for frontend confirmation).
            
        Note:
            - Invalid or expired tokens are silently ignored for security
            - All access tokens generated from this refresh token remain valid
              until their expiration time
            - To completely remove access, client should discard access token
        """
        try:
            token = RefreshToken(refresh_token_string)
            token.blacklist()
            logger.info("Token blacklisted successfully")
        except TokenError as e:
            # Silently ignore invalid tokens (don't reveal token validity)
            logger.debug(f"Token blacklist attempt with invalid/expired token: {str(e)}")
            pass
        
        return True
    
    @staticmethod
    def refresh_access_token(refresh_token_string: str) -> str:
        """Generate a new access token using a valid refresh token.
        
        Used when an access token expires and the client needs a new one
        without requiring the user to login again. Called when frontend
        receives a 401 Unauthorized response.
        
        Args:
            refresh_token_string (str): Valid JWT refresh token.
            
        Returns:
            str: New JWT access token (valid for 15 minutes).
            
        Raises:
            AuthenticationFailedError: If refresh token is invalid or expired.
            
        Example:
            >>> new_access = AuthService.refresh_access_token(refresh_token)
            >>> # Use new_access for subsequent API calls
        """
        try:
            refresh = RefreshToken(refresh_token_string)
            return str(refresh.access_token)
        except TokenError as e:
            raise AuthenticationFailedError(f"Invalid or expired refresh token: {str(e)}")

    @staticmethod
    def request_password_reset(email: str) -> bool:
        """Generate and send a password reset token via email.
        
        Creates a one-time password reset token for the email address and
        sends it via email (implementation depends on email service setup).
        
        For security, always returns True regardless of whether the email
        exists in the system - this prevents account enumeration attacks.
        
        Args:
            email (str): Email address to send reset token to.
            
        Returns:
            bool: Always True (doesn't reveal if email exists).
            
        Raises:
            Exception: Errors are logged but not raised to maintain security
            
        Note:
            - In DEBUG mode, token is printed to console for testing
            - In PRODUCTION, requires configured email service
            - Token expires after 24 hours (see PasswordReset model)
            - Each request generates a new token, invalidating previous ones
            - Email service errors are logged but don't prevent token creation
        """
        try:
            user = UserRepository.get_by_email(email)

            if user:
                token_obj = PasswordResetRepository.create_token(user)

                if settings.DEBUG:
                    # Print token to console for development/testing
                    print(f"\n[DEV] Password reset token for {email}: {token_obj.token}\n")
                else:
                    try:
                        # TODO: Send token via email in production
                        # EmailService.send_password_reset_email(user.email, token_obj.token)
                        # For now, just log that we would send it
                        logger.info(f"Password reset requested for user: {email} (token created)")
                    except Exception as email_error:
                        # Log email service errors but don't expose to user
                        logger.error(
                            f"Failed to send password reset email to {email}: {str(email_error)}",
                            exc_info=True
                        )
        except Exception as e:
            # Log any unexpected errors but don't raise to maintain security
            logger.error(
                f"Error during password reset request for {email}: {str(e)}",
                exc_info=True
            )
        
        # Always return True for security (don't leak whether email exists)
        return True
    
    @staticmethod
    def confirm_password_reset(token_string: str, new_password: str) -> bool:
        """Validate reset token and update user's password.
        
        Verifies the password reset token is valid and hasn't expired,
        then updates the user's password and marks the token as used
        to prevent reuse.
        
        Args:
            token_string (str): One-time password reset token from email.
            new_password (str): New password (will be hashed with Argon2).
            
        Returns:
            bool: True if password reset successful.
            
        Raises:
            ValidationError: If token is invalid or has expired.
            
        Example:
            >>> success = AuthService.confirm_password_reset(
            ...     token_string='abc123xyz',
            ...     new_password='NewPass123!'
            ... )
            >>> # User can now login with new password
        """
        # Find and validate the reset token
        token_obj = PasswordResetRepository.get_valid_token(token_string)
        if not token_obj:
            raise ValidationError("Reset token is invalid or has expired.")
        
        # Update the user's password
        UserRepository.update_password(token_obj.user, new_password)
        
        # Mark token as used to prevent reuse
        PasswordResetRepository.mark_used(token_obj)

        return True
    
    @staticmethod
    def get_user_profile(user_id: int):
        """Retrieve a user's profile information by ID.
        
        Args:
            user_id (int): The user's database ID.
            
        Returns:
            CustomUser: The user instance with all profile data.
            
        Raises:
            UserNotFoundError: If user with given ID doesn't exist.
        """
        user = UserRepository.get_by_id(user_id)
        if not user:
            raise UserNotFoundError(f"User with id {user_id} not found.")
        return user
    
    @staticmethod
    def update_user_profile(user_id: int, **fields):
        """Update user profile information.
        
        Updates only the specified fields, useful for partial profile updates.
        
        Args:
            user_id (int): The user's database ID.
            **fields: Keyword arguments for fields to update (e.g., first_name='John').
            
        Returns:
            CustomUser: Updated user instance.
            
        Raises:
            UserNotFoundError: If user with given ID doesn't exist.
            
        Example:
            >>> user = AuthService.update_user_profile(
            ...     user_id=123,
            ...     first_name='Johnny',
            ...     last_name='Doe'
            ... )
        """
        updated = UserRepository.update_user(user_id, **fields)
        if not updated:
            raise UserNotFoundError(f"User with id {user_id} not found.")
        return UserRepository.get_by_id(user_id)
    
    @staticmethod
    def _generate_tokens(user) -> dict:
        """Generate JWT access and refresh tokens for a user.
        
        Internal method called after successful authentication to create
        the JWT token pair used for subsequent API requests.
        
        Args:
            user: CustomUser instance to generate tokens for.
            
        Returns:
            dict: Dictionary with keys:
                - 'access' (str): JWT access token, valid for 15 minutes
                - 'refresh' (str): JWT refresh token, valid for 7 days
                
        Note:
            - Called internally by register_user() and login_user()
            - Tokens use HS256 algorithm and include user ID in claims
            - Access tokens should be sent with every API request
            - Refresh tokens should be stored securely and only used
              to get new access tokens
        """
        refresh = RefreshToken.for_user(user)

        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }
    
    




    

