#!/usr/bin/env python3
import subprocess
import sys

# Run in a completely fresh process
code = """
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

print("Testing dashboard imports...")
try:
    from apps.dashboard.views import (
        DashboardStatsView,
        DashboardAnalyticsView,
        DashboardProjectsByCategoryView,
        DashboardRecentActivityView,
    )
    print("✅ All imports successful!")
    
    from django.test import RequestFactory
    from apps.authentication.models import CustomUser
    
    admin = CustomUser.objects.filter(role='admin').first()
    if not admin:
        print("❌ No admin user found — create one first")
        exit(1)
    
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
        
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
"""

result = subprocess.run([sys.executable, "-c", code], capture_output=False, text=True)
sys.exit(result.returncode)
