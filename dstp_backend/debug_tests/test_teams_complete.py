#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from apps.teams.models import TeamMember
from apps.authentication.models import CustomUser

# Create a test user if none exists
user = CustomUser.objects.first()
if not user:
    user = CustomUser.objects.create_user(
        email='taaransh@dstp.com',
        password='testpass123',
        first_name='Taaransh',
        last_name='Sharma',
        role='admin'
    )
    print(f"Created test user: {user.first_name} {user.last_name}")

# Clear existing items for clean test
TeamMember.objects.all().delete()

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
