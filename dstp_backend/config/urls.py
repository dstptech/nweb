# config/urls.py

from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

# API v1 URL patterns
api_v1_patterns = [
    # Authentication (Taaransh)
    path("auth/", include("apps.authentication.urls")),

    # Content APIs (Yashas)
    path("services/",     include("apps.services.urls")),
    path("projects/",     include("apps.projects.urls")),
    path("blog/",         include("apps.blog.urls")),
    path("testimonials/", include("apps.testimonials.urls")),
    path("careers/",      include("apps.careers.urls")),
    path("contact/",      include("apps.contact.urls")),
    path("industries/",   include("apps.industries.urls")),
    path("homepage/",     include("apps.homepage.urls")),
]

urlpatterns = [
    path("api/v1/", include((api_v1_patterns, "v1"), namespace="v1")),
    path("api/v1/projects/", include("apps.projects.urls")),
    path("api/v1/blog/", include("apps.blog.urls")),
    path("api/v1/careers/", include("apps.careers.urls")),
    path("api/v1/testimonials/", include("apps.testimonials.urls")),
    path("api/v1/contact/", include("apps.contact.urls")),
    path("api/v1/industries/", include("apps.industries.urls")),
    path("api/v1/homepage/", include("apps.homepage.urls")),
    path('api/v1/auth/', include('apps.authentication.urls')),



    # API schema + docs
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]

# Development extras
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    from django.contrib import admin
    urlpatterns += [path("admin/", admin.site.urls)]

# Custom error handlers
handler400 = "apps.core.exceptions.bad_request_handler"
handler403 = "apps.core.exceptions.permission_denied_handler"
handler404 = "apps.core.exceptions.not_found_handler"
handler500 = "apps.core.exceptions.server_error_handler"
