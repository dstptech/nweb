from rest_framework.routers import DefaultRouter
from .views import HomepageViewSet

router = DefaultRouter()
router.register(r'homepage', HomepageViewSet, basename='homepage')

urlpatterns = router.urls
