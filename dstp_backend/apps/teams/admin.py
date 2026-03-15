from django.contrib import admin
from .models import TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'department', 'status', 'display_order', 'created_at')
    list_filter = ('status', 'department', 'created_at')
    search_fields = ('name', 'role', 'department')
    ordering = ('display_order', 'name')
    
    fieldsets = (
        ('Account Link', {'fields': ('user',)}),
        ('Profile', {'fields': ('name', 'role', 'department', 'photo', 'bio')}),
        ('Status', {'fields': ('status', 'display_order')}),
        ('Social', {'fields': ('social_links',)}),
        ('Dates', {'fields': ('joined', 'created_at', 'updated_at'), 'classes': ('collapse',)}),
    )
    readonly_fields = ('created_at', 'updated_at')
