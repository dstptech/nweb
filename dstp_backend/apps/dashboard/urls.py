from django.urls import path
from .views import (
    DashboardStatsView,
    DashboardAnalyticsView,
    DashboardProjectsByCategoryView,
    DashboardRecentActivityView,
)

urlpatterns = [
    path('stats/',                DashboardStatsView.as_view(),               name='dashboard-stats'),
    path('analytics/',            DashboardAnalyticsView.as_view(),            name='dashboard-analytics'),
    path('projects-by-category/', DashboardProjectsByCategoryView.as_view(),   name='dashboard-projects-by-category'),
    path('recent-activity/',      DashboardRecentActivityView.as_view(),        name='dashboard-recent-activity'),
]