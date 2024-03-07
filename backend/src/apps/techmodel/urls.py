from rest_framework.urls import path
from rest_framework.routers import DefaultRouter

from .views import BrandView, TypeNameView, TechModelView, TechModelFilter, BrandAndTypeView

router = DefaultRouter()

router.register('brand', BrandView)
router.register('typename', TypeNameView)
router.register('techmodel', TechModelView)
router.register('techAndBrand', BrandAndTypeView, basename='techAndBrand')


urlpatterns = []

urlpatterns += router.urls
