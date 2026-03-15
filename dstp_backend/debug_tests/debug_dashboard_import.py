#!/usr/bin/env python
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

print("Attempting to import dashboard.views...")
try:
    import apps.dashboard.views as views_module
    print("✅ Module imported")
    print("\nAvailable attributes:")
    attrs = [a for a in dir(views_module) if not a.startswith('_')]
    for attr in attrs:
        print(f"  - {attr}")
        
except Exception as e:
    print(f"❌ Import failed: {e}")
    import traceback
    traceback.print_exc()
