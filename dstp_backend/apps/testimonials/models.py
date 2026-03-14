from django.db import models

class Testimonial(models.Model):
    client_name = models.CharField(max_length=200)
    feedback = models.TextField()
    rating = models.PositiveIntegerField(default=5)
    client_image = models.ImageField(upload_to="testimonials/", blank=True, null=True)

    class Meta:
        db_table = 'testimonials'

    def __str__(self):
        return f"{self.client_name} ({self.rating}/5)"
