'''Contains all the BUsiness LOgic
->received The Form
->validated it
->queried the DB
->Called authenticate() / login()
-> Returns the Response

'''



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

class AuthService:
    '''Handles all the authentication Business Logic
    register , login , logout , token-refresh , password reset'''


    #REGISTER
    @staticmethod
    def register_user(email,password , first_name , last_name , role='viewer'):

        '''  -> Creates a new account
            Checks email uniqueness first then  create user + blank-profile'''
        # step1 - >Check if email already exists
        if UserRepository.email_exists(email):
            raise ConflictError(f"An account with email '{email}' already exists.")
        
        # step2-> creates the user
        user = UserRepository.create_user(
            email=email.lower(),
            password=password,
            first_name=first_name.strip(),
            last_name=last_name.strip(),
            role=role,
        )
        
        #step3 -> Generate JWT Tokens for new user
        tokens = AuthService._generate_tokens(user)

        return user , tokens
    

    #LOGIN
    '''Authenticate Credentials and retuns JWT tokens'''
    @staticmethod
    def login_user(email,password):

    # Check user exists
        user = UserRepository.get_by_email(email)
        if not user:
            raise AuthenticationFailedError("This Account has been Deactivated")
        
        # Check account is Active or not
        if not user.is_active:
            raise AuthenticationFailedError("This account has been deactivated")
        
        authenticated_user = django_authenticate(
            username=email,
            password=password
        )



        if not authenticated_user:
            raise AuthenticationFailedError("Invalid email or Password")
        
        # Step 4 generate JWT Tokens

        tokens = AuthService._generate_tokens(authenticated_user)

        return authenticated_user , tokens
    

    # LOGOUT

    @staticmethod
    def logout_user(refresh_token_string):
        #Uses a Valid Refresh Token to issue a new access token

        try:
            token = RefreshToken(refresh_token_string)
            token.blacklist()

        except TokenError:
            pass
    
    #token Refresh
    @staticmethod
    def refresh_access_token(refresh_token_string):

        '''Uses a valid Refresh Token to issue a new access token
        Called when frontend gets 401 and needs to silently  re-authenticate'''
        try:
            refresh = RefreshToken(refresh_token_string)
            return str(refresh.access_token)
        except TokenError as e:
            raise AuthenticationFailedError(f"Invalid or expired refresh token: {str(e)}")

    # Password Reset: Request

    @staticmethod
    def request_password_reset(email):
        # Generates a rest Token and emails it

        user = UserRepository.get_by_email(email)

        if user:
            token_obj = PasswordResetRepository.create_token(user)

            if settings.DEBUG:
                # Printing Token in Terminal For Trusting
                print(f"\n[DEV] Password reset token for {email}: {token_obj.token}\n")
        # always return True -dont leak whether email exists or not
        return True
    

    # Password Reset Confirm

    @staticmethod
    def confirm_password_reset(token_string , new_password):
        # Validates The Reset Token And Updates the password

        # Step 1 Find Valid unexpired Token
        token_obj = PasswordResetRepository.get_valid_token(token_string)
        if not token_obj:
            raise ValidationError("Reset token is Invalid Or Has expired")
        
        #step 2 : Update the Password
        UserRepository.update_password(token_obj.user , new_password)
        
        #step 3 : Mark token as used so it cant be us reused
        PasswordResetRepository.mark_used(token_obj)

        return True
    
    # GET PROFILE
    @staticmethod
    def get_user_profile(user_id):
        user = UserRepository.get_by_id(user_id)
        if not user:
            raise UserNotFoundError(f"User with id {user_id} not found")
        return user
    
    # Update Profile
    @staticmethod
    def update_user_profile(user_id , **fields):
        updated = UserRepository.update_user(user_id , **fields)
        if not updated:
            raise UserNotFoundError(f"User with id {user_id} not found")
        return UserRepository.get_by_id(user_id)
    
    # Token generator
    
    @staticmethod
    def _generate_tokens(user):

        refresh  = RefreshToken.for_user(user)

        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }
    
    




    

