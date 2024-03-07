from django.contrib import admin
from .models import Info, Footer, mainSlider, popularSlider

@admin.register(Info)
class InfoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Info._meta.fields]  # показать все поля в админке

@admin.register(Footer)
class FooterAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Footer._meta.fields]  # показать все поля в админке

@admin.register(mainSlider)
class MainSliderAdmin(admin.ModelAdmin):
    list_display = [field.name for field in mainSlider._meta.fields]  # показать все поля в админке

@admin.register(popularSlider)
class PopularSliderAdmin(admin.ModelAdmin):
    list_display = [field.name for field in popularSlider._meta.fields]  # показать все поля в админке

