 # These models store everything about a visitor — even before they register.
# Two tables:
#   1. VisitorSession  -> who is visiting (one record per unique visitor)
#   2. PageVisit       -> what pages they visited 

from django.db import models
from django.utils import timezone
from django.conf import settings
class VisitorSession(models.Model):
    #One Record per unique visitor
    #I Created the moment someone lands on the site for the first time
    session_key = models.CharField(max_length=64 , unique=True , db_index=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='visitor_sessions'
        )
    
        # Device and browser info
    ip_address = models.GenericIPAddressField(null=True,blank=True)
    user_agent = models.TextField(blank=True)
    device_type = models.CharField(max_length=20 , blank=True) # Mobile , Table ,desktop
    browser = models.CharField(max_length=50 , blank=True) #chrome , FireFox 
    os = models.CharField(max_length=50 , blank=True)

    #where they came from
    referrer = models.URLField(blank=True) #which website they came from
    utm_source   = models.CharField(max_length=100, blank=True)  # Google, Facebook etc
    utm_medium   = models.CharField(max_length=100, blank=True)  # cpc, email, organic
    utm_campaign = models.CharField(max_length=100, blank=True)  # campaign name

    #Visit Counts
    total_visits = models.IntegerField(default=1) # How many times they come back
    total_page_field = models.IntegerField(default=0) # Total Pages They Looked at
    
    #timestamps
    first_seen = models.DateTimeField(default=timezone.now) # very first visit
    last_seen = models.DateTimeField(default=timezone.now) # Most recent active

    #STATUS
    is_registered = models.BooleanField(default=False) # Did they Register ?
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'visitor_sessions'
        ordering = ['-last_seen']

    def __str__(self):
        if self.user:
            return f"Session of {self.user.email} - {self.session_key[:8]}..."
        return f"Anonymous visitor - {self.session_key[:8]}... ({self.ip_address})"

    def mark_as_registered(self, user):
        # called when anonymous visitor creates an account
        # links all their history to their new user account
        self.user          = user
        self.is_registered = True
        self.save()
class PageVisit(models.Model):
    #One record every time visitor views a Page
    # Which visitor viewed the Page
    visitor = models.ForeignKey(
        VisitorSession , 
        on_delete=models.CASCADE,
        related_name='page_visits'
    )
    #what Page They Visits
    page_url = models.CharField(max_length=500) # /Services #/About
    page_title = models.CharField(max_length=200 , blank=True) # sent from Frontend

    # How They Got To this Page
    referrer_page = models.CharField(max_length=500 , blank=True) #Previous Page

    # Time How Long they stayed
    # its updated when they leave the page(sent from frontend)
    time_spent_seconds = models.IntegerField(default=0)

    #When 
    visited_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'page_visits'
        ordering = ['-visited_at']
    
    def __str__(self):
        return f"{self.visitor.session_key[:8]}... visited {self.page_url}"
    