from django.db import models
from django.contrib.auth.models import AbstractBaseUser , BaseUserManager , PermissionsMixin
from django.utils import timezone


''' Here i Created A CustomUser using AbstractBaseUser
 Because we need extra fields like role and phone number and we need full control over what the user looks like
 Django basically Allows one custom user per project  - we set AUTH_USER in settings to point here
 '''
# In Pairs Roles of Users are Defined
ROLE_CHOICES = [ ('admin' , 'Administrator') , ('editor' , 'Editor') , ('viewer' , 'Viewer') ]



class CustomUserManager(BaseUserManager):
    # Creating a user
    def create_user(self , email , password=None , **extra_fields):
            if not email:
                  raise ValueError('Email is required')
            email = self.normalize_email(email) # lowercase 
            user  = self.model(email=email , **extra_fields)
            user.set_password(password)
            user.save(using=self.db)
            return user
    # Creating a superuser
    def create_superuser(self , email , password=None , **extra_fields):
          extra_fields.setdefault('is_staff' , True)
          extra_fields.setdefault('is_superuser' , True)
          extra_fields.setdefault('role' , 'admin')
          return self.create_user(email, password , **extra_fields)
    

# Creating a Custom User

# AbstractBaseUser ->  Basically Gives Us functionality of password hashing  , last_login , no username 
# PermissionsMixin -> gives us : is_superuser , user_permissions

class CustomUser(AbstractBaseUser , PermissionsMixin):
      # Core Fields

      email = models.EmailField(unique=True)
      first_name = models.CharField(max_length=70)
      last_name = models.CharField(max_length=100 , blank=True)  # Increased from 15 to support longer names
      
      role = models.CharField(max_length=10 , choices=ROLE_CHOICES , default='viewer')

      # Account status Flags
      is_active = models.BooleanField(default=True)
      is_staff = models.BooleanField(default=False)
      is_verified = models.BooleanField(default=False) # Did They Verify Email

      # Timestamps
      date_joined = models.DateTimeField(default=timezone.now)
      updated_at = models.DateTimeField(auto_now=True)

      # User Email is the Unique Identifier
      USERNAME_FIELD = 'email'
      REQUIRED_FIELDS = ['first_name' , 'last_name']

      objects = CustomUserManager()

      class Meta:
            db_table = 'auth_users'
            ordering =  ['date_joined']

      def  __str__(self):
            # same pattern you used in your chai models
            return f"{self.first_name} {self.last_name} ({self.email})"
      def get_full_name(self):
            return f"{self.first_name} {self.last_name}".strip()
      

      @property # Check Roles Without important constants everywhere
      def is_admin(self):
            return self.role == 'admin' or self.is_superuser

      def is_editor(self):
            return self.role in ('admin' , 'editor') or self.is_superuser
      


class UserProfile(models.Model):
      user = models.OneToOneField(CustomUser , on_delete=models.CASCADE , related_name='profile')

      bio = models.TextField(default='' , blank=True)
      avatar = models.ImageField(upload_to='avatars/' , blank=True , null=True)
      designation =  models.CharField(max_length=100 , blank=True) # Eg -> senior devloper
      
      created_at = models.DateTimeField(default=timezone.now)
      updated_at = models.DateTimeField(auto_now=True)


      class Meta:
            db_table = 'auth_user_profile'

      def __str__(self):
            return f"Profile of {self.user.get_full_name()}"
      

# Stores the Temporary Token Emailed To users For password Reset

class PasswordResetToken(models.Model):

      user = models.ForeignKey(CustomUser , on_delete=models.CASCADE , related_name='reset_tokens')
      token  = models.CharField(max_length=64 , unique=True)
      created_at = models.DateTimeField(default=timezone.now)
      is_used = models.BooleanField(default=False)

      class Meta:
            db_table = 'auth_password_reset_token'

      def __str__(self):
            return f"Reset token for {self.user.email}"
      
      def is_expired(self):

            # Token expires after 30 Mmin
            from django.conf import settings
            from datetime import timedelta
            expiry = self.created_at + timedelta(minutes=settings.PASSWORD_RESET_TIMEOUT_MINUTES)
            return timezone.now() > expiry