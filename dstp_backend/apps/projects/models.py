from django.db import models


class Project(models.Model):

    # ── Your existing fields (unchanged) ─────────────────────────────────────
    title         = models.CharField(max_length=200)
    description   = models.TextField()
    client        = models.CharField(max_length=100)
    completed_on  = models.DateField()
    project_image = models.ImageField(
                        upload_to="projects/screenshots/",
                        blank=True, null=True
                    )

    # ── NEW: category for dashboard grouping ─────────────────────────────────
    CATEGORY_CHOICES = [
        ('web_mobile',      'Web & Mobile'),
        ('ai_ml',           'AI & ML'),
        ('data_engineering','Data Engineering'),
        ('cloud_devops',    'Cloud & DevOps'),
        ('iot',             'IoT'),
        ('enterprise',      'Enterprise'),
        ('other',           'Other'),
    ]
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default='other',
        help_text="Used for dashboard grouping chart"
    )

    class Meta:
        db_table = 'projects'
        ordering = ['-completed_on']

    def __str__(self):
        return self.title