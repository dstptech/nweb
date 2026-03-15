#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from apps.authentication.models import CustomUser

admin = CustomUser.objects.filter(role='admin').first()
if admin:
    print(f"Admin: {admin.email}")
    print(f"Role: {admin.role}")
    print(f"Is Staff: {admin.is_staff}")
    print(f"Is Superuser: {admin.is_superuser}")
    
    # Test permission directly
    from apps.authentication.permissions import IsAdmin
    from django.test import RequestFactory
    
    factory = RequestFactory()
    req = factory.get('/')
    req.user = admin
    perm = IsAdmin()
    has_perm = perm.has_permission(req, None)
    print(f"\nHas IsAdmin permission: {has_perm}")
else:
    print("No admin user found")
