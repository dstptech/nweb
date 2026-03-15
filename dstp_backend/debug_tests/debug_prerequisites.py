#!/usr/bin/env python
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

print("Testing serializers import...")
try:
    from apps.teams.serializers import TeamMemberSerializer,TeamMemberPublicSerializer
    print("✅ Serializers imported OK")
except Exception as e:
    print(f"❌ Failed: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

print("\nTesting models import...")
try:
    from apps.teams.models import TeamMember
    print("✅ Models imported OK")
except Exception as e:
    print(f"❌ Failed: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

print("\nTesting permissions import...")
try:
    from apps.authentication.permissions import IsAdmin, IsEditor
    print("✅ Permissions imported OK")
except Exception as e:
    print(f"❌ Failed: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

print("\nAll prerequisites OK")
