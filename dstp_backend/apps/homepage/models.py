from django.db import models

class Homepage(models.Model):
    hero_title = models.CharField(max_length=200)
    hero_subtitle = models.CharField(max_length=300, blank=True, null=True)
    hero_image = models.ImageField(upload_to="homepage/", blank=True, null=True)

    banner_text = models.CharField(max_length=200, blank=True, null=True)
    banner_image = models.ImageField(upload_to="homepage/", blank=True, null=True)

    stats_title = models.CharField(max_length=200, blank=True, null=True)
    stats_value = models.CharField(max_length=100, blank=True, null=True)

    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Homepage Content ({self.updated_on.date()})"
