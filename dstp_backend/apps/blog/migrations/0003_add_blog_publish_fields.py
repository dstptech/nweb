# Generated manually due to database connection issues
# Migration to add publish control fields to Blog model

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_alter_blog_table'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='is_published',
            field=models.BooleanField(default=False, help_text='True = visible on public site. False = draft.'),
        ),
        migrations.AddField(
            model_name='blog',
            name='published_at',
            field=models.DateTimeField(blank=True, help_text='Auto-set on first publish. Null means still a draft.', null=True),
        ),
    ]
