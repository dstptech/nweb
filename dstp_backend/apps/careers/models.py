from django.db import models

class Career(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    apply_link = models.URLField(blank=True, null=True)
    posted_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
