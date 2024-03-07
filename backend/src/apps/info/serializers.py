from rest_framework import serializers
from .models import Info, Footer, mainSlider, popularSlider


class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = '__all__'


class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = '__all__'


class MainSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = mainSlider
        fields = '__all__'

class PopularSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = popularSlider
        fields = '__all__'