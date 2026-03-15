#!/usr/bin/env python
"""Test homepage JSON fields"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from apps.homepage.models import Homepage

# Get or create the single homepage record
hp, created = Homepage.objects.get_or_create(
    id=1,
    defaults={'hero_title': 'Welcome to DSTP'}
)

# Write to JSON sections
hp.about = {
    'title':       'About DSTP IT Solutions',
    'description': 'We build digital products.',
    'founded':     '2020',
    'team_size':   '50+'
}

hp.contact_section = {
    'email':   'hello@dstp.io',
    'phone':   '+91-XXXXXXXXXX',
    'address': 'New Delhi, India'
}

hp.services_section = {
    'title': 'Our Services',
    'subtitle': 'What we offer',
    'items': [
        {'icon': 'ai', 'title': 'AI & ML', 'description': 'Machine learning services'},
        {'icon': 'cloud', 'title': 'Cloud DevOps', 'description': 'Cloud infrastructure'}
    ]
}

hp.tech_stack = {
    'title': 'Technologies We Use',
    'subtitle': 'Our toolkit',
    'items': [
        {'name': 'Python', 'logo': '/media/tech/python.png', 'category': 'backend'},
        {'name': 'React', 'logo': '/media/tech/react.png', 'category': 'frontend'}
    ]
}

hp.save()

# Read it back
hp_check = Homepage.objects.get(id=1)
print("✅ about title:", hp_check.about.get('title'))
print("✅ contact email:", hp_check.contact_section.get('email'))
print("✅ services items count:", len(hp_check.services_section.get('items', [])))
print("✅ tech_stack items count:", len(hp_check.tech_stack.get('items', [])))
print("\n✅ All JSON fields working correctly!")
