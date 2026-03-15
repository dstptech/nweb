#!/usr/bin/env python
"""Debug Service serializer fields"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from apps.services.models import Service
from apps.services.serializers import ServiceSerializer

# Get the most recent service
svc = Service.objects.first()
if not svc:
    print("No services in database")
else:
    print(f"Service: {svc.title}")
    print(f"  is_featured: {svc.is_featured}")
    print(f"  created_at: {svc.created_at}")
    print()
    
    # Check serializer
    serializer = ServiceSerializer(svc)
    print("Serializer fields defined:")
    for field_name, field in serializer.fields.items():
        print(f"  {field_name}: {type(field).__name__}")
    
    print()
    print("Serialized data:")
    data = serializer.data
    import json
    print(json.dumps(data, indent=2, default=str))
