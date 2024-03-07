from rest_framework.urls import path
from rest_framework.routers import DefaultRouter

from .views import SparePartView

router = DefaultRouter()

router.register('sparepart', SparePartView)

urlpatterns = []

urlpatterns += router.urls
 