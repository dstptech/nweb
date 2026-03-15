from django.db import models


class Career(models.Model):

    # ── Your existing fields (unchanged) ─────────────────────────────────────
    title       = models.CharField(max_length=200)
    description = models.TextField()
    location    = models.CharField(max_length=200)
    apply_link  = models.URLField(blank=True, null=True)
    posted_on   = models.DateField(auto_now_add=True)

    # ── NEW: open/closed status for dashboard count ───────────────────────────
    is_open = models.BooleanField(
        default=True,
        help_text="True = accepting applications. False = position filled/closed."
    )

    class Meta:
        db_table = 'job_listings'
        ordering = ['-posted_on']

    def __str__(self):
        return self.title