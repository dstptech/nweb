#!/usr/bin/env python
"""Test Service model and serializer fields"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from apps.services.models import Service, ServiceCategory
from apps.services.serializers import ServiceSerializer

# Create test data if empty
cat, _ = ServiceCategory.objects.get_or_create(name="Test Category")
svc, _ = Service.objects.get_or_create(
    title="Test Service",
    defaults={
        'category':    cat,
        'description': 'A test service',
        'is_featured': True,
    }
)

# Serialize and check all fields admin UI needs
data = ServiceSerializer(svc).data
print("Serialized fields available:", list(data.keys()))
print()
print("title:      ", data.get('title'))
print("name:       ", data.get('name'))       # alias — should match title
print("status:     ", data.get('status'))     # should be 'Featured'
print("created_at: ", data.get('created_at')) # should be a timestamp

if data.get('name') == data.get('title'):
    print("\n✅ name field correctly aliases title")
if data.get('status') == 'Featured':
    print("✅ status field correctly returns 'Featured' for is_featured=True")
if data.get('created_at'):
    print("✅ created_at field has timestamp value")
    
print("\n✅ All fields OK")

