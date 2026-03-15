#!/usr/bin/env python
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

print("Django setup complete")

try:
    print("Attempting to import apps.teams.urls...")
    import apps.teams.urls as teams_urls
    print("✅ Import successful")
    
    print("\nModule attributes:")
    attrs = [a for a in dir(teams_urls) if not a.startswith('_')]
    for attr in attrs:
        print(f"  - {attr}: {type(getattr(teams_urls, attr))}")
    
    print(f"\nurlpatterns exists: {hasattr(teams_urls, 'urlpatterns')}")
    print(f"urlpatterns type: {type(getattr(teams_urls, 'urlpatterns', None))}")
    print(f"urlpatterns value: {getattr(teams_urls, 'urlpatterns', None)}")
    
except Exception as e:
    print(f"❌ Import failed: {e}")
    import traceback
    traceback.print_exc()
