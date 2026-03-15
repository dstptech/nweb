from django.db import models
from django.utils import timezone


class Blog(models.Model):
    # ── Your existing fields (unchanged) ──────────────────────────────────────
    title        = models.CharField(max_length=200)
    content      = models.TextField()
    author       = models.CharField(max_length=100)
    published_on = models.DateField(auto_now_add=True)
    thumbnail    = models.ImageField(upload_to="blog/", blank=True, null=True)

    # ── NEW: publish control fields ───────────────────────────────────────────
    is_published = models.BooleanField(
        default=False,
        help_text="True = visible on public site. False = draft."
    )
    published_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Auto-set on first publish. Null means still a draft."
    )

    class Meta:
        db_table = 'blog_posts'

    def __str__(self):
        return self.title

    def publish(self):
        """
        Call this to publish a blog post.
        Sets is_published=True and stamps published_at (only on first publish).
        Example: blog.publish()
        """
        self.is_published = True
        if not self.published_at:
            self.published_at = timezone.now()
        self.save(update_fields=['is_published', 'published_at'])