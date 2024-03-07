from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ApplicationViewSet,CombinedSparepartsTechModelsView

router = DefaultRouter()

router.register('', ApplicationViewSet)


urlpatterns = [
    path('combinedsparepartstechmodel/', CombinedSparepartsTechModelsView.as_view(), name='combinedsparepartstechmodel'),
]

urlpatterns += router.urls