"""
DSTP Backend — Root URL Configuration
All API routes live under /api/v1/.
Swagger docs available at /api/docs/ and /api/redoc/.
"""

from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)


# ─────────────────────────────────────────────────────────────────────────────
# API v1 URL patterns
# Each app registers its own urls.py and gets mounted here.
# ─────────────────────────────────────────────────────────────────────────────

api_v1_patterns = [
    # ── Authentication (Taaransh) ──────────────────────────────────────────
    path("auth/",         include("apps.authentication.urls")),

    # ── Content APIs (Yashass) ────────────────────────────────────────────
    path("services/",     include("apps.services.urls")),
    path("projects/",     include("apps.projects.urls")),
    path("blog/",         include("apps.blog.urls")),
    path("testimonials/", include("apps.testimonials.urls")),
    path("careers/",      include("apps.careers.urls")),
    path("contact/",      include("apps.contact.urls")),
    path("industries/",   include("apps.industries.urls")),
    path("homepage/",     include("apps.homepage.urls")),
]


# ─────────────────────────────────────────────────────────────────────────────
# Main URL patterns
# ─────────────────────────────────────────────────────────────────────────────

urlpatterns = [
    # ── API v1 ────────────────────────────────────────────────────────────
    path("api/v1/", include((api_v1_patterns, "v1"), namespace="v1")),

    # ── OpenAPI Schema (raw JSON/YAML) ────────────────────────────────────
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),

    # ── Swagger UI ────────────────────────────────────────────────────────
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),

    # ── ReDoc UI ──────────────────────────────────────────────────────────
    path(
        "api/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]


# ─────────────────────────────────────────────────────────────────────────────
# Development extras
# ─────────────────────────────────────────────────────────────────────────────

if settings.DEBUG:
    # Serve media files locally in dev
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    # Django admin — available only in dev
    from django.contrib import admin  # noqa: E402
    urlpatterns += [path("admin/", admin.site.urls)]


# ─────────────────────────────────────────────────────────────────────────────
# Custom error handlers (wire to utils/exceptions.py views)
# ─────────────────────────────────────────────────────────────────────────────

handler400 = "utils.exceptions.bad_request_handler"
handler403 = "utils.exceptions.permission_denied_handler"
handler404 = "utils.exceptions.not_found_handler"
handler500 = "utils.exceptions.server_error_handler"