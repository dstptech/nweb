#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from apps.authentication.models import CustomUser

# Check if admin exists
admin = CustomUser.objects.filter(role='admin').first()
if not admin:
    print("Creating admin user...")
    admin = CustomUser.objects.create_user(
        email='admin@dstp.com',
        password='admin123',
        first_name='Admin',
        last_name='User',
        role='admin'
    )
    print(f"✅ Created: {admin.email}")
else:
    print(f"✅ Admin exists: {admin.email}")

# Test the endpoints now
from django.test import RequestFactory
from apps.dashboard.views import (
    DashboardStatsView,
    DashboardAnalyticsView,
    DashboardProjectsByCategoryView,
    DashboardRecentActivityView,
)

factory = RequestFactory()

for view_class, path in [
    (DashboardStatsView,               '/api/v1/dashboard/stats/'),
    (DashboardAnalyticsView,           '/api/v1/dashboard/analytics/'),
    (DashboardProjectsByCategoryView,  '/api/v1/dashboard/projects-by-category/'),
    (DashboardRecentActivityView,      '/api/v1/dashboard/recent-activity/'),
]:
    req = factory.get(path)
    req.user = admin
    view = view_class.as_view()
    res = view(req)
    print(f"{res.status_code}  {path}")
