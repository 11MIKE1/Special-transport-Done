from rest_framework import viewsets
from .models import Info, Footer, mainSlider, popularSlider
from .serializers import InfoSerializer, FooterSerializer, MainSliderSerializer, PopularSliderSerializer


class InfoListView(viewsets.ReadOnlyModelViewSet):
    queryset = Info.objects.all()
    serializer_class = InfoSerializer

class FooterListView(viewsets.ReadOnlyModelViewSet):
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer

class MainSliderListView(viewsets.ReadOnlyModelViewSet):
    queryset = mainSlider.objects.all()
    serializer_class = MainSliderSerializer


class PopularSliderListView(viewsets.ReadOnlyModelViewSet):
    queryset = popularSlider.objects.all()
    serializer_class = PopularSliderSerializer
