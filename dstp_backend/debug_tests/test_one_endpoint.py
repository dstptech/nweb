#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from rest_framework.test import APIClient
from apps.authentication.models import CustomUser

# Get or create admin user
admin, created = CustomUser.objects.get_or_create(
    email='taaransh@dstp.com',
    defaults={
        'first_name': 'Taaransh',
        'last_name': 'Sharma',
        'role': 'admin',
        'is_active': True,
        'is_verified': True,
    }
)

client = APIClient()
client.force_authenticate(user=admin)

print(f"\nTesting with admin: {admin.email}")
print("-" * 60)

try:
    print("Testing GET /api/v1/dashboard/stats/...")
    response = client.get('/api/v1/dashboard/stats/')
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Response: {data}")
    else:
        print(f"Error: {response.content}")
except Exception as e:
    print(f"Exception: {e}")
    import traceback
    traceback.print_exc()

print("-" * 60)
