from django.db import models


class ServiceCategory(models.Model):
    name        = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        db_table = 'service_categories'

    def __str__(self):
        return self.name


class Service(models.Model):
    category    = models.ForeignKey(
        ServiceCategory,
        on_delete=models.CASCADE,
        related_name="services"
    )
    title       = models.CharField(max_length=150)
    description = models.TextField()
    is_featured = models.BooleanField(default=False)

    # NEW — admin UI expects a 'created' date column
    created_at  = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'services'
        ordering = ['-created_at']   # newest first in admin table

    def __str__(self):
        return self.title


class ServiceFeature(models.Model):
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name="features"
    )
    feature = models.CharField(max_length=200)

    class Meta:
        db_table = 'service_features'

    def __str__(self):
        return self.feature

    def __str__(self):
        return self.feature

    def __str__(self):
        return self.feature