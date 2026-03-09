from django.db import models

class Industry(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.ImageField(upload_to="industries/", blank=True, null=True)

    def __str__(self):
        return self.name
