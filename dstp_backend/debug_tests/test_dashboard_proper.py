#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from rest_framework.test import APITestCase, APIClient
from apps.authentication.models import CustomUser

class DashboardEndpointsTest(APITestCase):
    
    def setUp(self):
        # Get or create admin user
        self.admin, created = CustomUser.objects.get_or_create(
            email='taaransh@dstp.com',
            defaults={
                'first_name': 'Taaransh',
                'last_name': 'Sharma',
                'role': 'admin',
                'is_active': True,
                'is_verified': True,
            }
        )
        
        # Create client
        self.client = APIClient()
        
    def test_dashboard_endpoints_with_admin(self):
        """Test all dashboard endpoints with authenticated admin user"""
        endpoints = [
            '/api/v1/dashboard/stats/',
            '/api/v1/dashboard/analytics/',
            '/api/v1/dashboard/projects-by-category/',
            '/api/v1/dashboard/recent-activity/',
        ]
        
        # Authenticate as admin
        self.client.force_authenticate(user=self.admin)
        
        print(f"\nTesting with admin: {self.admin.email} (role={self.admin.role})")
        print("-" * 60)
        
        for endpoint in endpoints:
            response = self.client.get(endpoint)
            print(f"GET {endpoint:<45} {response.status_code}")
            if response.status_code != 200:
                print(f"  Response: {response.json()}")
            else:
                print(f"  ✓ Success - Data returned")
        
        print("-" * 60)

if __name__ == '__main__':
    import unittest
    unittest.main()
