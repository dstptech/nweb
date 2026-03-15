#!/usr/bin/env python
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

print("Direct import of TeamMember from models...")
try:
    import apps.teams.models
    print(f"Module attributes: {[x for x in dir(apps.teams.models) if not x.startswith('_')]}")
except Exception as e:
    print(f"Failed: {e}")
    import traceback
    traceback.print_exc()
