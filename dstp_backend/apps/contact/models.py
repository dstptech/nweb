from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    submitted_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'contact_messages'

    def __str__(self):
        return f"{self.name} ({self.email})"
