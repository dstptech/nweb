#!/usr/bin/env python

urls_content = '''from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamMemberViewSet

router = DefaultRouter()
router.register(r'members', TeamMemberViewSet, basename='team-member')

urlpatterns = [
    path('', include(router.urls)),
]
'''

with open('apps/teams/urls.py', 'w') as f:
    f.write(urls_content)
print("✅ urls.py created")
