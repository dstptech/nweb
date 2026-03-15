from django.db import models


class TeamMember(models.Model):
    """
    Represents a team member on the public website.

    Two modes:
    1. Standalone — just name + role + photo, no login account needed.
       Use for advisors, interns, external contributors.

    2. Linked — connected to a CustomUser login account via 'user' field.
       Profile auto-fills name from the account on first save.
       Use for staff who also log into the admin panel.
    """

    STATUS_CHOICES = [
        ('active',   'Active'),
        ('inactive', 'Inactive'),
    ]

    # ── Optional link to login account ───────────────────────────────────────
    # Set this if the team member also logs into the admin panel.
    # Leave blank for external advisors, interns, etc.
    user = models.OneToOneField(
        'authentication.CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='team_profile',
        help_text="Link to admin login account. Optional."
    )

    # ── Core display fields ───────────────────────────────────────────────────
    name       = models.CharField(max_length=150)
    role       = models.CharField(max_length=100,
                     help_text="e.g. Lead Developer, UI Designer")
    department = models.CharField(max_length=100,
                     help_text="e.g. Engineering, Design, Marketing")
    photo      = models.ImageField(
                     upload_to="team/",
                     blank=True,
                     null=True,
                     help_text="Profile photo shown on website"
                 )
    bio        = models.TextField(
                     blank=True,
                     help_text="Short bio shown on the team page"
                 )

    # ── Status + ordering ─────────────────────────────────────────────────────
    status        = models.CharField(
                        max_length=10,
                        choices=STATUS_CHOICES,
                        default='active',
                        help_text="Inactive members are hidden from public website"
                    )
    display_order = models.PositiveIntegerField(
                        default=0,
                        help_text="Lower number = appears first. 0 = top of list."
                    )

    # ── Social links as JSON ──────────────────────────────────────────────────
    # Flexible — add any platform without a new migration.
    # Example: {"linkedin": "https://...", "github": "https://...", "twitter": "https://..."}
    social_links = models.JSONField(
                       default=dict,
                       blank=True,
                       help_text="Social links as JSON: {linkedin, github, twitter, ...}"
                   )

    # ── Dates ─────────────────────────────────────────────────────────────────
    joined     = models.DateField(
                     null=True,
                     blank=True,
                     help_text="Date they joined the company"
                 )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'team_members'
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} — {self.role}"

    def save(self, *args, **kwargs):
        """
        Auto-fill name from linked user account on first save.
        Only fills if name is empty — won't overwrite manual edits.
        """
        if self.user and not self.name:
            full_name = f"{self.user.first_name} {self.user.last_name}".strip()
            if full_name:
                self.name = full_name
        super().save(*args, **kwargs)


class TeamMember(models.Model):
    """
    Represents a team member on the public website.

    Two modes:
    1. Standalone — just name + role + photo, no login account needed.
       Use for advisors, interns, external contributors.

    2. Linked — connected to a CustomUser login account via 'user' field.
       Profile auto-fills name from the account on first save.
       Use for staff who also log into the admin panel.
    """

    STATUS_CHOICES = [
        ('active',   'Active'),
        ('inactive', 'Inactive'),
    ]

    # ── Optional link to login account ───────────────────────────────────────
    # Set this if the team member also logs into the admin panel.
    # Leave blank for external advisors, interns, etc.
    user = models.OneToOneField(
        'authentication.CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='team_profile',
        help_text="Link to admin login account. Optional."
    )

    # ── Core display fields ───────────────────────────────────────────────────
    name       = models.CharField(max_length=150)
    role       = models.CharField(max_length=100,
                     help_text="e.g. Lead Developer, UI Designer")
    department = models.CharField(max_length=100,
                     help_text="e.g. Engineering, Design, Marketing")
    photo      = models.ImageField(
                     upload_to="team/",
                     blank=True,
                     null=True,
                     help_text="Profile photo shown on website"
                 )
    bio        = models.TextField(
                     blank=True,
                     help_text="Short bio shown on the team page"
                 )

    # ── Status + ordering ─────────────────────────────────────────────────────
    status        = models.CharField(
                        max_length=10,
                        choices=STATUS_CHOICES,
                        default='active',
                        help_text="Inactive members are hidden from public website"
                    )
    display_order = models.PositiveIntegerField(
                        default=0,
                        help_text="Lower number = appears first. 0 = top of list."
                    )

    # ── Social links as JSON ──────────────────────────────────────────────────
    # Flexible — add any platform without a new migration.
    # Example: {"linkedin": "https://...", "github": "https://...", "twitter": "https://..."}
    social_links = models.JSONField(
                       default=dict,
                       blank=True,
                       help_text="Social links as JSON: {linkedin, github, twitter, ...}"
                   )

    # ── Dates ─────────────────────────────────────────────────────────────────
    joined     = models.DateField(
                     null=True,
                     blank=True,
                     help_text="Date they joined the company"
                 )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'team_members'
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} — {self.role}"

    def save(self, *args, **kwargs):
        """
        Auto-fill name from linked user account on first save.
        Only fills if name is empty — won't overwrite manual edits.
        """
        if self.user and not self.name:
            full_name = f"{self.user.first_name} {self.user.last_name}".strip()
            if full_name:
                self.name = full_name
        super().save(*args, **kwargs)