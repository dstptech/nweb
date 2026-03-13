# apps/core/urls.py
# tracking endpoints — mounted at /api/v1/track/ in root urls.py

from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [

    # POST /api/v1/track/time-spent/
    path('time-spent/', views.TrackTimeSpentView.as_view(),    name='time-spent'),

    # POST /api/v1/track/link-session/
    path('link-session/', views.LinkSessionToUserView.as_view(), name='link-session'),

    # GET  /api/v1/track/my-stats/
    path('my-stats/', views.GetVisitorStatsView.as_view(),     name='my-stats'),

]