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

print("\n" + "="*70)
print("🎉  SIMPLIFIED DATABASE TABLE NAMES  🎉")
print("="*70 + "\n")

# Categorized tables for easier understanding
categories = {
    "👤 User Management": ["users", "user_profiles", "password_reset_tokens"],
    "📝 Content Management": ["blog_posts", "services", "service_categories", "service_features", "projects"],
    "🏢 Business Info": ["job_listings", "industries", "testimonials"],
    "📞 Customer Relations": ["contact_messages"],
    "🏠 Website": ["homepage_content"],
    "📊 Analytics": ["visitor_tracking", "page_tracking"],
    "🔐 Django System": ["auth_group", "auth_permission", "auth_group_permissions", "users_groups", "users_user_permissions", "django_content_type", "django_migrations", "django_session", "django_admin_log", "token_blacklist_blacklistedtoken", "token_blacklist_outstandingtoken"],
}

table_list = [t[0] for t in tables]

for category, table_names in categories.items():
    print(f"\n{category}:")
    print("-" * 70)
    for table in sorted(table_names):
        if table in table_list:
            print(f"  ✓ {table}")

print("\n" + "="*70)
print(f"📊 Total Tables: {len(table_list)}")
print("="*70 + "\n")
