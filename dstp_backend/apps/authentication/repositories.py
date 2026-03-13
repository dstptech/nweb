''' This is Basically The Repository layer
Which Handles All The Database Queries
So For Our useCase  where Views -> Calls Services ->Services -> Calls Repositories
If we want to swap MySQL for PostGreSQL  we need to change one file
not every view .. clean Separation
'''

import secrets
from django.utils import timezone
from .models import CustomUser , UserProfile , PasswordResetToken

class UserRepository:
    '''
    All CustomUser Database OPerations'''

    # Create

    @staticmethod
    def create_user(email , password , first_name , last_name , role='viewer'):
        user = CustomUser.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            role=role,
        )

        #auto - Create a blank Profile For every  new user
        UserProfile.objects.create(user=user)
        return user
    
    # Read

    @staticmethod
    def get_by_id(user_id):
        # same idea as ChaiVarity.objects.get(id=...) from your practice project
        try:
            return CustomUser.objects.select_related('profile').get(id=user_id)
        except CustomUser.DoesNotExist:
            return None  # return None, not raise — let the service decide what to do

    @staticmethod
    def get_by_email(email):
        try:
            return CustomUser.objects.select_related('profile').get(email=email.lower())
        except CustomUser.DoesNotExist:
            return None

    @staticmethod
    def get_all_users():
        return CustomUser.objects.select_related('profile').all().order_by('-date_joined')

    @staticmethod
    def get_users_by_role(role):
        # .filter() — like filtering chais by type
        return CustomUser.objects.filter(role=role, is_active=True)

    @staticmethod
    def email_exists(email):
        # quick check before creating — returns True/False
        return CustomUser.objects.filter(email=email.lower()).exists()
    

    # UPDATE

    @staticmethod

    def update_user(user_id , **fields):
        # **fields - >defines what caller passes what they want to update
        #  # e.g. update_user(1, first_name='Taaransh', role='admin')

        updated = CustomUser.objects.filter(id=user_id).update(**fields)
        return updated > 0 
    @staticmethod 
    def update_password(user , new_password):
        user.set_password(new_password)
        user.save(update_fields=['password'])
        return user
    
    @staticmethod
    def mark_email_verified(user_id):
        return CustomUser.objects.filter(id=user_id).update(is_verified=True)
    

    #DELETE
    @staticmethod
    def deactivate_user(user_id):
        # we don't hard-delete users — we just set is_active=False
        return CustomUser.objects.filter(id=user_id).update(is_active=False)


class PasswordResetRepository:
    '''All Password Reset Token Operations'''

    @staticmethod
    def create_token(user):
        # Invalidate Any existing token
        PasswordResetToken.objects.filter(user=user , is_used=False).update(is_used=True)
        token = secrets.token_hex(32)
        return PasswordResetToken.objects.create(user=user , token=token)
    
    @staticmethod
    def get_valid_token(token_string):
        try:
            token = PasswordResetToken.objects.select_related('user').get(token=token_string , is_used=False )
            if token.is_expired():
             return None
            return token
        except PasswordResetToken.DoesNotExist:
            return None
    
    @staticmethod
    def mark_used(token):
        token.is_used = True
        token.save(update_fields=['is_used'])



    
