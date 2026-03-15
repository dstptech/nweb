from django.db import models


class Homepage(models.Model):
    """
    Stores all homepage content as structured JSON sections.
    There should only ever be ONE row in this table (singleton pattern).
    Admin panel fetches/updates this single record.
    """

    # ── Existing hero fields (kept so old data is not lost) ────────────────
    hero_title    = models.CharField(max_length=200)
    hero_subtitle = models.CharField(max_length=300, blank=True, null=True)
    hero_image    = models.ImageField(upload_to="homepage/", blank=True, null=True)
    banner_text   = models.CharField(max_length=200, blank=True, null=True)
    banner_image  = models.ImageField(upload_to="homepage/", blank=True, null=True)
    stats_title   = models.CharField(max_length=200, blank=True, null=True)
    stats_value   = models.CharField(max_length=100, blank=True, null=True)

    # ── NEW: structured sections as JSON ──────────────────────────────────
    # Each field stores a dict. Frontend reads and writes the full dict.
    # Default values define the shape so frontend always gets valid structure.

    about = models.JSONField(
        default=dict,
        blank=True,
        help_text="About section: title, subtitle, description, image, founded, team_size"
    )

    services_section = models.JSONField(
        # named services_section to avoid clash with the services app
        default=dict,
        blank=True,
        help_text="Services overview section: title, subtitle, items[]"
    )

    tech_stack = models.JSONField(
        default=dict,
        blank=True,
        help_text="Tech stack section: title, subtitle, items[]"
    )

    projects_section = models.JSONField(
        # named projects_section to avoid clash with the projects app
        default=dict,
        blank=True,
        help_text="Projects showcase section: title, subtitle, items[]"
    )

    testimonials_section = models.JSONField(
        default=dict,
        blank=True,
        help_text="Testimonials section: title, subtitle, items[]"
    )

    contact_section = models.JSONField(
        default=dict,
        blank=True,
        help_text="Contact section: title, email, phone, address, map_link"
    )

    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'homepage'

    def __str__(self):
        return f"Homepage (updated {self.updated_on:%Y-%m-%d %H:%M})"