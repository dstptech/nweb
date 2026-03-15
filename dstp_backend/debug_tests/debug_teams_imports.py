#!/usr/bin/env python
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

print("Testing imports one by one...")

try:
    print("1. Importing django.urls...")
    from django.urls import path, include
    print("   ✅ OK")
except Exception as e:
    print(f"   ❌ FAILED: {e}")
    exit(1)

try:
    print("2. Importing rest_framework.routers...")
    from rest_framework.routers import DefaultRouter
    print("   ✅ OK")
except Exception as e:
    print(f"   ❌ FAILED: {e}")
    exit(1)

try:
    print("3. Importing apps.teams.views.TeamMemberViewSet...")
    from apps.teams.views import TeamMemberViewSet
    print("   ✅ OK")
except Exception as e:
    print(f"   ❌ FAILED: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

try:
    print("4. Creating router...")
    router = DefaultRouter()
    router.register(r'members', TeamMemberViewSet, basename='team-member')
    print("   ✅ OK")
except Exception as e:
    print(f"   ❌ FAILED: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

try:
    print("5. Creating urlpatterns...")
    urlpatterns = [
        path('', include(router.urls)),
    ]
    print(f"   ✅ OK - urlpatterns: {urlpatterns}")
except Exception as e:
    print(f"   ❌ FAILED: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

print("\n✅ All imports successful!")
