from django.contrib import admin
from .models import Career

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "posted_on")
    search_fields = ("title", "location")
    list_filter = ("posted_on",)
