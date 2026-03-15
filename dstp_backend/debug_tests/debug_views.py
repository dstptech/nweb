#!/usr/bin/env python
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

print("Attempting to import views module...")
try:
    import apps.teams.views as views_module
    print("✅ Module imported")
    
    print("\nModule attributes:")
    attrs = [a for a in dir(views_module) if not a.startswith('_')]
    for attr in attrs:
        val = getattr(views_module, attr)
        print(f"  - {attr}: {type(val).__name__}")
    
except Exception as e:
    print(f"❌ Import failed: {e}")
    import traceback
    traceback.print_exc()
