"""
DSTP Backend — Production Settings
Extends base.py with hardened, production-grade overrides.
All secrets MUST come from environment variables — never hardcoded.

Usage:
    export DJANGO_SETTINGS_MODULE=dstp_backend.settings.prod
"""

from .base import *  # noqa: F401, F403
from decouple import config


# ─────────────────────────────────────────────────────────────────────────────
# CORE
# ─────────────────────────────────────────────────────────────────────────────

DEBUG = False  # NEVER True in production

ALLOWED_HOSTS = config(
    "ALLOWED_HOSTS",
    cast=lambda v: [h.strip() for h in v.split(",")]
)


# ─────────────────────────────────────────────────────────────────────────────
# DATABASE — Cloud SQL / RDS (production credentials from env)
# ─────────────────────────────────────────────────────────────────────────────

DATABASES = {
    "default": {
        "ENGINE":   "django.db.backends.mysql",
        "NAME":     config("DB_NAME"),
        "USER":     config("DB_USER"),
        "PASSWORD": config("DB_PASSWORD"),
        "HOST":     config("DB_HOST"),
        "PORT":     config("DB_PORT", default="3306"),
        "OPTIONS": {
            "charset": "utf8mb4",
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
            "ssl": {"ssl-mode": "REQUIRED"},  # Enforce SSL for DB connections
        },
        "CONN_MAX_AGE": 60,
    }
}


# ─────────────────────────────────────────────────────────────────────────────
# SECURITY HEADERS — OWASP hardening
# ─────────────────────────────────────────────────────────────────────────────

# Force HTTPS
SECURE_SSL_REDIRECT         = True
SECURE_PROXY_SSL_HEADER     = ("HTTP_X_FORWARDED_PROTO", "https")

# HSTS: tell browsers to always use HTTPS for 1 year
SECURE_HSTS_SECONDS                = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS     = True
SECURE_HSTS_PRELOAD                = True

# Cookie security
SESSION_COOKIE_SECURE  = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = "Lax"

CSRF_COOKIE_SECURE     = True
CSRF_COOKIE_HTTPONLY   = True
CSRF_COOKIE_SAMESITE   = "Lax"

# Prevent browsers from sniffing content-type
SECURE_CONTENT_TYPE_NOSNIFF = True

# Clickjacking protection
X_FRAME_OPTIONS = "DENY"

# Browser XSS filter
SECURE_BROWSER_XSS_FILTER = True

# Referrer policy
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"


# ─────────────────────────────────────────────────────────────────────────────
# CORS — Restrict to known frontend domains only
# ─────────────────────────────────────────────────────────────────────────────

CORS_ALLOW_ALL_ORIGINS = False  # Never True in production

CORS_ALLOWED_ORIGINS = config(
    "CORS_ALLOWED_ORIGINS",
    default="https://dstp.io,https://admin.dstp.io",
    cast=lambda v: [o.strip() for o in v.split(",")]
)

CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://.*\.dstp\.io$",  # Allow all subdomains of dstp.io
]


# ─────────────────────────────────────────────────────────────────────────────
# REST FRAMEWORK — Production renderer (JSON only, no browsable API)
# ─────────────────────────────────────────────────────────────────────────────

REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = [  # noqa: F405
    "rest_framework.renderers.JSONRenderer",
]

REST_FRAMEWORK["DEFAULT_THROTTLE_RATES"] = {  # noqa: F405
    "anon": "100/hour",
    "user": "1000/hour",
    "auth": "10/minute",   # Very strict on auth endpoints
}


# ─────────────────────────────────────────────────────────────────────────────
# CACHING — Redis (required in production)
# ─────────────────────────────────────────────────────────────────────────────

REDIS_URL = config("REDIS_URL", default="redis://127.0.0.1:6379/0")

CACHES = {
    "default": {
        "BACKEND":  "django.core.cache.backends.redis.RedisCache",
        "LOCATION": REDIS_URL,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
        "TIMEOUT": 300,  # 5 minutes default TTL
    }
}


# ─────────────────────────────────────────────────────────────────────────────
# EMAIL — SMTP (production credentials from env)
# ─────────────────────────────────────────────────────────────────────────────

EMAIL_BACKEND       = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST          = config("EMAIL_HOST")
EMAIL_PORT          = config("EMAIL_PORT", default=587, cast=int)
EMAIL_USE_TLS       = True
EMAIL_HOST_USER     = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL  = config("DEFAULT_FROM_EMAIL", default="noreply@dstp.io")


# ─────────────────────────────────────────────────────────────────────────────
# STATIC FILES — Served via WhiteNoise or CDN in production
# ─────────────────────────────────────────────────────────────────────────────

STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"

# GCP Cloud Storage for media (if using django-storages)
# DEFAULT_FILE_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
# GS_BUCKET_NAME = config("GCS_BUCKET_NAME")


# ─────────────────────────────────────────────────────────────────────────────
# LOGGING — Production: errors to file + suppress DEBUG noise
# ─────────────────────────────────────────────────────────────────────────────

LOGGING["loggers"][""]["level"] = "WARNING"              # noqa: F405
LOGGING["loggers"]["apps"]["level"] = "INFO"             # noqa: F405
LOGGING["loggers"]["django.db.backends"]["level"] = "ERROR"  # noqa: F405


# ─────────────────────────────────────────────────────────────────────────────
# SWAGGER DOCS — Disable public access in production
# ─────────────────────────────────────────────────────────────────────────────

SPECTACULAR_SETTINGS["SERVERS"] = [  # noqa: F405
    {"url": "https://api.dstp.io", "description": "Production API"},
]