"""
DSTP Backend — Base Settings
Shared across all environments (dev, prod, staging).
Never use this file directly — import from dev.py or prod.py.
"""

import os
from pathlib import Path
from datetime import timedelta
from decouple import config

# PATHS
# Resolves to:  dstp/dstp_backend/
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# SECURITY

SECRET_KEY = config("SECRET_KEY")

# Never enable in base — each env file controls this
DEBUG = False

# Lock down to explicit hosts; overridden per environment
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="", cast=lambda v: [h.strip() for h in v.split(",")])


# INSTALLED APPS

DJANGO_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "drf_spectacular",
    "django_filters",
]

LOCAL_APPS = [
    "apps.core",
    "apps.authentication",
    "apps.services",
    "apps.projects",
    "apps.blog",
    "apps.testimonials",
    "apps.careers",
    "apps.contact",
    "apps.industries",
    "apps.homepage",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS


# MIDDLEWARE — Order is critical

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",           # CORS — must be before CommonMiddleware
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "middleware.visitor_tracking_middleware.VisitorTrackingMiddleware",  # Visitor tracking
    "middleware.logging_middleware.RequestLoggingMiddleware",  # Custom request logger
]


# URL & WSGI

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"


# TEMPLATES

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# DATABASE — MySQL (overridden per environment)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('MYSQL_DATABASE'),
        'USER': os.environ.get('MYSQL_USER'),
        'PASSWORD': os.environ.get('MYSQL_PASSWORD'),
        'HOST': os.environ.get('MYSQL_HOST', '127.0.0.1'),
        'PORT': os.environ.get('MYSQL_PORT', '3306'),
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        }
    }
    }


# CUSTOM USER MODEL

AUTH_USER_MODEL = "authentication.CustomUser"

# PASSWORD VALIDATION

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator", "OPTIONS": {"min_length": 8}},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Use Argon2 as the default password hasher (most secure)
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",      # Fallback
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",  # Fallback
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",# Fallback
]


# INTERNATIONALISATION

LANGUAGE_CODE = "en-us"
TIME_ZONE     = "Asia/Kolkata"
USE_I18N      = True
USE_TZ        = True


# STATIC & MEDIA FILES

STATIC_URL  = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL  = "/media/"
MEDIA_ROOT = BASE_DIR / "media"


# DEFAULT PRIMARY KEY

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# DJANGO REST FRAMEWORK — Global config

REST_FRAMEWORK = {
    # Authentication: JWT only — no session auth for APIs
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],

    # Default: require login unless explicitly exempted
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],

    # Pagination: all list endpoints return pages of 10
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,

    # Filtering & ordering
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],

    # Throttling — basic defaults, overridden in prod
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "100/hour",
        "user": "1000/hour",
        "auth": "10/minute",   # Stricter limit on login/register
    },

    # Renderer: JSON only (no browsable API in production)
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],

    # Exception handler: routes to our custom handler
    "EXCEPTION_HANDLER": "apps.core.exceptions.custom_exception_handler",

    # Schema generation
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}


# SIMPLE JWT — Token configuration

SIMPLE_JWT = {
    # Token lifetimes
    "ACCESS_TOKEN_LIFETIME":  timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),

    # Rotate refresh tokens on each use (more secure)
    "ROTATE_REFRESH_TOKENS":  True,
    "BLACKLIST_AFTER_ROTATION": True,

    # Algorithm
    "ALGORITHM": "HS256",
    "SIGNING_KEY": config("SECRET_KEY"),

    # Header
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME":  "HTTP_AUTHORIZATION",

    # User identity
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",

    # Custom token serializer (set after auth app is ready)
    "TOKEN_OBTAIN_SERIALIZER": "apps.authentication.serializers.CustomTokenObtainPairSerializer",
}


# CORS — Controlled per environment (dev allows all, prod restricts)

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    "DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT",
]

CORS_ALLOW_HEADERS = [
    "accept", "accept-encoding", "authorization",
    "content-type", "dnt", "origin",
    "user-agent", "x-csrftoken", "x-requested-with",
]


# DRF SPECTACULAR — OpenAPI / Swagger docs

SPECTACULAR_SETTINGS = {
    "TITLE":       "DSTP Solutions API",
    "DESCRIPTION": "Enterprise IT Solutions REST API — v1",
    "VERSION":     "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,

    # Security scheme for JWT
    "SECURITY": [{"BearerAuth": []}],
    "COMPONENTS": {
        "securitySchemes": {
            "BearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT",
            }
        }
    },

    "SWAGGER_UI_SETTINGS": {
        "persistAuthorization": True,
        "displayRequestDuration": True,
    },
}


# EMAIL — Base config (SMTP credentials in env)

EMAIL_BACKEND       = config("EMAIL_BACKEND", default="django.core.mail.backends.console.EmailBackend")
EMAIL_HOST          = config("EMAIL_HOST", default="smtp.gmail.com")
EMAIL_PORT          = config("EMAIL_PORT", default=587, cast=int)
EMAIL_USE_TLS       = config("EMAIL_USE_TLS", default=True, cast=bool)
EMAIL_HOST_USER     = config("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD", default="")
DEFAULT_FROM_EMAIL  = config("DEFAULT_FROM_EMAIL", default="noreply@dstp.io")


# LOGGING — Structured logging to console + file

LOGS_DIR = BASE_DIR / "logs"
LOGS_DIR.mkdir(exist_ok=True)

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,

    "formatters": {
        "verbose": {
            "format": "[{asctime}] {levelname} {name} {module}:{lineno} — {message}",
            "style": "{",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },

    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
        "file_general": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": LOGS_DIR / "general.log",
            "maxBytes": 10 * 1024 * 1024,  # 10 MB
            "backupCount": 5,
            "formatter": "verbose",
        },
        "file_errors": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": LOGS_DIR / "errors.log",
            "maxBytes": 10 * 1024 * 1024,
            "backupCount": 5,
            "formatter": "verbose",
            "level": "INFO",
        },
    },

    "loggers": {
        # Root logger
        "": {
            "handlers": ["console", "file_general"],
            "level": "INFO",
            "propagate": False,
        },
        # Django internal
        "django": {
            "handlers": ["console", "file_general"],
            "level": "INFO",
            "propagate": False,
        },
        # Our apps
        "apps": {
            "handlers": ["console", "file_general", "file_errors"],
            "level": "DEBUG",
            "propagate": False,
        },
        # SQL queries — DEBUG only, enable in dev.py
        "django.db.backends": {
            "handlers": ["console"],
            "level": "WARNING",  # Changed to DEBUG in dev.py
            "propagate": False,
        },
    },
}


# CACHE — Default: local memory. Override with Redis in prod.

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "dstp-cache",
    }
}


# CUSTOM APP SETTINGS

# Password reset token expiry (minutes)
PASSWORD_RESET_TIMEOUT_MINUTES = 30

# Email verification token expiry (hours)
EMAIL_VERIFICATION_TIMEOUT_HOURS = 24

# API version prefix
API_VERSION = "v1"
API_PREFIX  = f"api/{API_VERSION}"