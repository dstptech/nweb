#!/usr/bin/env python
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')

# Read the actual file
with open('apps/dashboard/views.py', 'r') as f:
    content = f.read()
    
print(f"File size: {len(content)} bytes")
print(f"Contains 'class DashboardStatsView': {'class DashboardStatsView' in content}")
print(f"Contains 'class DashboardAnalyticsView': {'class DashboardAnalyticsView' in content}")
print(f"Contains 'class DashboardProjectsByCategoryView': {'class DashboardProjectsByCategoryView' in content}")
print(f"Contains 'class DashboardRecentActivityView': {'class DashboardRecentActivityView' in content}")

# Try to exec the file manually
print("\nAttempting to exec the file...")
namespace = {}
try:
    exec(compile(content, 'views.py', 'exec'), namespace)
    print("✅ File executed successfully")
    print(f"\nNamespace keys: {[k for k in namespace.keys() if not k.startswith('_')]}")
except Exception as e:
    print(f"❌ Execution failed: {e}")
    import traceback
    traceback.print_exc()
