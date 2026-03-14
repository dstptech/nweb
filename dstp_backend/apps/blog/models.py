from django.db import models

class Blog(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.CharField(max_length=100)
    published_on = models.DateField(auto_now_add=True)
    thumbnail = models.ImageField(upload_to="blog/", blank=True, null=True)

    class Meta:
        db_table = 'blog_posts'

    def __str__(self):
        return self.title
