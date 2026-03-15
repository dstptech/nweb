#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from apps.teams.models import TeamMember
from apps.authentication.models import CustomUser

# Test standalone member (no login needed)
t1 = TeamMember.objects.create(
    name="Riya Sharma",
    role="UI Designer",
    department="Design",
    status="active",
    display_order=1,
    social_links={"linkedin": "https://linkedin.com/in/riya"}
)

# Test linked member (has login account)
user = CustomUser.objects.first()
if user:
    t2 = TeamMember.objects.create(
        user=user,
        role="Backend Lead",
        department="Engineering",
        status="active",
        display_order=0,
    )
    print("Linked member name auto-filled:", t2.name)

print("Standalone member:", t1.name, "|", t1.role, "|", t1.status)
print("Total members:", TeamMember.objects.count())
print("Active members:", TeamMember.objects.filter(status='active').count())
print("All OK")
