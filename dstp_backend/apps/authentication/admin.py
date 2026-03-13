# authentication/admin.py
from django.contrib import admin
from .models import CustomUser, UserProfile, PasswordResetToken

admin.site.register(CustomUser)
admin.site.register(UserProfile)
admin.site.register(PasswordResetToken)
