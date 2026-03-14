from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    client = models.CharField(max_length=100)
    completed_on = models.DateField()
    project_image = models.ImageField(upload_to="projects/screenshots/", blank=True, null=True)

    class Meta:
        db_table = 'projects'

    def __str__(self):
        return self.title
