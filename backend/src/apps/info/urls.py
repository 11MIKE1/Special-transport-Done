from rest_framework.routers import DefaultRouter
from .views import InfoListView, FooterListView, MainSliderListView, PopularSliderListView

router = DefaultRouter()
router.register('Info', InfoListView, basename='info')
router.register('Footer', FooterListView, basename='footer')
router.register('MainSliders', MainSliderListView, basename='mainSlider')
router.register('PopularSliders', PopularSliderListView, basename='popularSlider')

urlpatterns = []

urlpatterns += router.urls
