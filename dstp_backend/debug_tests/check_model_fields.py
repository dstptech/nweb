#!/usr/bin/env python
"""Check Service model fields metadata"""

import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')

# Need to setup Django first
django.setup()

# NOW import the model
from apps.services.models import Service

print("Service model fields:")
print("─" * 80)
for field in Service._meta.get_fields():
    print(f"  {field.name:20} {type(field).__name__}")
print("─" * 80)

# Check if created_at is in the model
created_at_field = None
try:
    created_at_field = Service._meta.get_field('created_at')
    print(f"\n✅ created_at field found: {created_at_field}")
except Exception as e:
    print(f"\n❌ created_at field NOT found: {e}")
