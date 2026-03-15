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

endpoints = [
    '/api/v1/dashboard/stats/',
    '/api/v1/dashboard/analytics/',
    '/api/v1/dashboard/projects-by-category/',
    '/api/v1/dashboard/recent-activity/',
]

print(f"\nTesting with admin: {admin.email} (role={admin.role})")
print("-" * 80)

for endpoint in endpoints:
    response = client.get(endpoint)
    status = response.status_code
    icon = "[OK]" if status == 200 else "[FAIL]"
    print(f"{icon} {status}  GET {endpoint}")
    
    if status != 200:
        try:
            print(f"   Response: {response.json()}")
        except:
            print(f"   Response: {response.content[:100]}")
    else:
        try:
            data = response.json()
            if 'data' in data:
                if isinstance(data['data'], dict):
                    print(f"   Data keys: {list(data['data'].keys())[:5]}")
                elif isinstance(data['data'], list):
                    print(f"   Data: {len(data['data'])} items")
        except:
            pass

print("-" * 80)
