from django.contrib import admin
from .models import Homepage

@admin.register(Homepage)
class HomepageAdmin(admin.ModelAdmin):
    list_display = ("hero_title", "banner_text", "updated_on")
    search_fields = ("hero_title", "banner_text")
