#!/usr/bin/env python
"""Test token rotation and blacklisting."""
import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.authentication.services import AuthService
from apps.authentication.models import CustomUser

user = CustomUser.objects.first()

if user:
    print("=" * 70)
    print("TOKEN ROTATION & BLACKLIST TEST")
    print("=" * 70)
    
    # Step 1: Generate initial tokens
    print("\n[1] Generating initial tokens...")
    tokens = AuthService._generate_tokens(user)
    old_refresh = tokens['refresh']
    print(f"    Old refresh: {old_refresh[:30]}...")
    
    # Step 2: Use the refresh — should return NEW tokens and blacklist the old one
    print("\n[2] Refreshing tokens (should rotate and blacklist old refresh)...")
    new_tokens = AuthService.refresh_access_token(old_refresh)
    print(f"    New access:  {new_tokens['access'][:30]}...")
    print(f"    New refresh: {new_tokens['refresh'][:30]}...")
    
    # Step 3: Try using the OLD refresh again — should now FAIL (blacklisted)
    print("\n[3] Testing if OLD refresh token is blacklisted...")
    try:
        AuthService.refresh_access_token(old_refresh)
        print("    ❌ ERROR — old token still works, ROTATION FAILED")
    except Exception as e:
        print(f"    ✅ CORRECT — old token rejected: {str(e)[:60]}")
    
    print("\n" + "=" * 70)
    print("TEST COMPLETE ✅")
    print("=" * 70)
else:
    print("❌ No users found in database")
