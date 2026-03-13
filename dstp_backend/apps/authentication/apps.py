
# Full dotted path in name — matches what's in INSTALLED_APPS in settings

from django.apps import AppConfig


class AuthenticationConfig(AppConfig):
    name         = 'apps.authentication'
    verbose_name = 'Authentication'