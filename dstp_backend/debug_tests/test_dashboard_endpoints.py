#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from django.test import RequestFactory
from django.contrib.auth.models import AnonymousUser
from apps.authentication.models import CustomUser
from apps.dashboard.views import (
    DashboardStatsView,
    DashboardAnalyticsView,
    DashboardProjectsByCategoryView,
    DashboardRecentActivityView,
)

# Use admin user for permission check
admin = CustomUser.objects.filter(role='admin').first()
if not admin:
    print("No admin user found — create one first with createsuperuser")
else:
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
        res  = view(req)
        print(f"{res.status_code}  {path}")
