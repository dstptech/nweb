#!/usr/bin/env python
"""Check database schema for services table"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from django.db import connection

with connection.cursor() as cursor:
    cursor.execute("DESCRIBE services;")
    columns = cursor.fetchall()
    print("Services table schema:")
    print("─" * 80)
    for col in columns:
        print(f"  {col}")
    print("─" * 80)
    
    # Check if created_at exists
    created_at_exists = any('created_at' in str(col).lower() for col in columns)
    print(f"\n✅ created_at column exists: {created_at_exists}")

