import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.dev")
os.environ["MYSQL_DATABASE"] = "my_project_db"
os.environ["MYSQL_USER"] = "django_user"
os.environ["MYSQL_PASSWORD"] = "DjangoPass456!"
os.environ["MYSQL_HOST"] = "127.0.0.1"
os.environ["MYSQL_PORT"] = "3308"

django.setup()

from django.db import connection

cursor = connection.cursor()
cursor.execute("SHOW TABLES")
tables = cursor.fetchall()

print("✅ All MySQL Tables:")
print("=" * 50)
for t in sorted(tables):
    print(f"  • {t[0]}")

# Check for specific tables
print("\n✅ Target Tables:")
print("=" * 50)
target_tables = ['auth_user_profile', 'visitor_sessions']
for target in target_tables:
    if any(target == t[0] for t in tables):
        print(f"  ✓ {target} - EXISTS")
    else:
        print(f"  ✗ {target} - NOT FOUND")
