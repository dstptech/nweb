# apps/authentication/urls.py
# Same as your app-level urls.py in practice project.
# All these get mounted at /api/v1/auth/ by the root urls.py

from django.urls import path
from . import views

app_name = 'authentication'

urlpatterns = [

    # POST /api/v1/auth/register/
    path('register/',                views.RegisterView.as_view(),             name='register'),

    # POST /api/v1/auth/login/
    path('login/',                   views.LoginView.as_view(),                name='login'),

    # POST /api/v1/auth/logout/
    path('logout/',                  views.LogoutView.as_view(),               name='logout'),

    # POST /api/v1/auth/refresh/
    path('refresh/',                 views.RefreshView.as_view(),              name='refresh'),

    # GET  /api/v1/auth/me/
    path('me/',                      views.MeView.as_view(),                   name='me'),

    # PATCH /api/v1/auth/me/update/
    path('me/update/',               views.UpdateProfileView.as_view(),        name='me-update'),

    # POST /api/v1/auth/password-reset/
    path('password-reset/',          views.PasswordResetRequestView.as_view(), name='password-reset'),

    # POST /api/v1/auth/password-reset/confirm/
    path('password-reset/confirm/',  views.PasswordResetConfirmView.as_view(), name='password-reset-confirm'),

]