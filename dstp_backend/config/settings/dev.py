"""
DSTP Backend — Development Settings
Extends base.py with dev-friendly overrides.

Usage:
    export DJANGO_SETTINGS_MODULE=dstp_backend.settings.dev
    OR set in .env:  DJANGO_SETTINGS_MODULE=dstp_backend.settings.dev
"""

from .base import *  # noqa: F401, F403

try:
    from decouple import config
except ImportError:
    from os import getenv as config

# CORE OVERRIDES

DEBUG = True

ALLOWED_HOSTS = ["*"]  # Open in dev — never use in production


# INSTALLED APPS — Dev extras

INSTALLED_APPS += [  # noqa: F405
    "django.contrib.admin",  # Enable Django admin only in dev (for quick inspection)
]


# DATABASE — SQLite for local development

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# REST FRAMEWORK — Dev overrides

REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = [  # noqa: F405
    "rest_framework.renderers.JSONRenderer",
    "rest_framework.renderers.BrowsableAPIRenderer",  # Enable browsable API in dev
]

# Relax throttling in dev so you can hit endpoints freely
REST_FRAMEWORK["DEFAULT_THROTTLE_RATES"] = {  # noqa: F405
    "anon": "10000/hour",
    "user": "100000/hour",
    "auth": "1000/minute",
}

# CORS — Allow all origins in dev (React dev server on :5173 / :3000)

CORS_ALLOW_ALL_ORIGINS = True  # Dev only!

# EMAIL — Print emails to console in dev

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


# CACHING — Dummy cache in dev (disable caching so changes are immediate)

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.dummy.DummyCache",
    }
}


# LOGGING — Verbose in dev: show SQL queries + DEBUG level

LOGGING["loggers"]["django.db.backends"]["level"] = "DEBUG"  # noqa: F405
LOGGING["loggers"]["apps"]["level"] = "DEBUG"  # noqa: F405


# SECURITY — Relaxed for local dev

# Don't enforce HTTPS in dev
SESSION_COOKIE_SECURE   = False
CSRF_COOKIE_SECURE      = False
SECURE_SSL_REDIRECT     = False

# JWT: store in localStorage in dev (easier to test with Postman)
SIMPLE_JWT_DEV_STORAGE = "localStorage"  # Custom flag read by auth views


# DJANGO EXTENSIONS — Optional dev tool (if installed)

try:
    import django_extensions  # noqa: F401
    INSTALLED_APPS += ["django_extensions"]  # noqa: F405
except ImportError:
    pass


# INTERNAL IPS — Needed for debug toolbar (if installed)

INTERNAL_IPS = ["127.0.0.1", "localhost"]