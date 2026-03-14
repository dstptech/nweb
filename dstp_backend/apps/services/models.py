from django.db import models

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        db_table = 'service_categories'

class Service(models.Model):
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name="services")
    title = models.CharField(max_length=150)
    description = models.TextField()
    is_featured = models.BooleanField(default=False)

    class Meta:
        db_table = 'services'

class ServiceFeature(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="features")
    feature = models.CharField(max_length=200)

    class Meta:
        db_table = 'service_features'
