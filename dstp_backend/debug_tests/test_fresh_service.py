#!/usr/bin/env python
"""Test Service with created_at field - fresh import"""

import os
import django
import sys

# Clear any cached modules
if 'apps.services' in sys.modules:
    del sys.modules['apps.services']
if 'apps.services.models' in sys.modules:
    del sys.modules['apps.services.models']
if 'apps.services.serializers' in sys.modules:
    del sys.modules['apps.services.serializers']

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

# Fresh import
from apps.services.models import Service, ServiceCategory
from apps.services.serializers import ServiceSerializer

# Clean up old test data
Service.objects.filter(title="Fresh Test Service").delete()
ServiceCategory.objects.filter(name="Fresh Test Category").delete()

# Create fresh test data
cat = ServiceCategory.objects.create(name="Fresh Test Category", description="")
svc = Service.objects.create(
    category=cat,
    title="Fresh Test Service",
    description='A fresh test service',
    is_featured=True,
)

print(f"Service created: {svc.title}")
print(f"  id: {svc.id}")
print(f"  is_featured: {svc.is_featured}")
print(f"  created_at: {svc.created_at}")
print()

# Now serialize
serializer = ServiceSerializer(svc)
data = serializer.data

import json
print("Serialized JSON:")
print(json.dumps(data, indent=2, default=str))
print()

# Check specific fields
print("Field checks:")
print(f"  title: {data.get('title')} {'✅' if data.get('title') else '❌'}")
print(f"  name: {data.get('name')} {'✅' if data.get('name') else '❌'}")
print(f"  status: {data.get('status')} {'✅' if data.get('status') == 'Featured' else '❌'}")
print(f"  created_at: {data.get('created_at')} {'✅' if data.get('created_at') else '❌'}")
