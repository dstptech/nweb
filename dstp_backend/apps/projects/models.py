from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    client = models.CharField(max_length=200, blank=True, null=True)
    completed_on = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.title
