#!/usr/bin/env python
"""Update models.py to add created_at field"""

with open('apps/services/models.py', 'r') as f:
    content = f.read()

# Add created_at field after is_featured
new_content = content.replace(
    'is_featured = models.BooleanField(default=False)\n\n    class Meta:',
    'is_featured = models.BooleanField(default=False)\n    created_at = models.DateTimeField(auto_now_add=True, null=True)\n\n    class Meta:'
)

# Add __str__ method to ServiceCategory
new_content = new_content.replace(
    "class Meta:\n        db_table = 'service_categories'\n\nclass Service",
    "class Meta:\n        db_table = 'service_categories'\n\n    def __str__(self):\n        return self.name\n\n\nclass Service"
)

# Add __str__ method to Service
new_content = new_content.replace(
    "db_table = 'services'\n\nclass ServiceFeature",
    "db_table = 'services'\n\n    def __str__(self):\n        return self.title\n\n\nclass ServiceFeature"
)

# Add __str__ method to ServiceFeature if not present
if "class ServiceFeature(models.Model):" in new_content and "def __str__(self):" not in new_content.split("class ServiceFeature")[1].split("class")[0]:
    new_content = new_content.replace(
        "db_table = 'service_features'",
        "db_table = 'service_features'\n\n    def __str__(self):\n        return self.feature"
    )

with open('apps/services/models.py', 'w') as f:
    f.write(new_content)

print('✅ File updated successfully')

# Verify
with open('apps/services/models.py', 'r') as f:
    content = f.read()
    if 'created_at' in content:
        print('✅ created_at field added')
    if content.count('def __str__(self):') >= 3:
        print('✅ All __str__ methods added')
