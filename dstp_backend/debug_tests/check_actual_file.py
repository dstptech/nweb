#!/usr/bin/env python
"""Check which models.py file Django is using"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from apps.services import models

print(f"Models module file: {models.__file__}")
print()

# Read the file directly
with open(models.__file__, 'r') as f:
    content = f.read()
    if 'created_at' in content:
        print("✅ created_at found in file content")
        # Show the line
        for i, line in enumerate(content.split('\n'), 1):
            if 'created_at' in line:
                print(f"   Line {i}: {line}")
    else:
        print("❌ created_at NOT found in file content")
        print("\nService class content:")
        in_service = False
        for i, line in enumerate(content.split('\n'), 1):
            if 'class Service(' in line:
                in_service = True
            if in_service:
                print(f"  {i:3}: {line}")
                if 'class Meta' in line:
                    break
