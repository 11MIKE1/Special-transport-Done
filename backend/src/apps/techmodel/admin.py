from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.html import format_html

from .models import Brand, TypeName, TechModel, ImageTechModel, VideoTechModel


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('title', 'country',)
    list_display_links = ('title', 'country',)
    search_fields = ('title', 'country',)
    list_filter = ('title', 'country',)


@admin.register(TypeName)
class TypeNameAdmin(admin.ModelAdmin):
    list_display = ('title',)
    list_display_links = ('title',)
    search_fields = ('title',)
    list_filter = ('title',)


class ImageTechModelInline(admin.TabularInline):
    model = ImageTechModel
    extra = 1


class VideoTechModelInline(admin.TabularInline):
    model = VideoTechModel
    extra = 1


@admin.register(TechModel)
class TechModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'type_name',
                    'get_image', 'display_short_video_link',)
    list_display_links = ('name', 'brand', 'type_name', 'get_image',)
    search_fields = ('name', 'brand', 'type_name',)
    list_filter = ('name', 'brand', 'type_name', 'year', 'price',)
    save_as = True
    save_on_top = True
    readonly_fields = ('display_short_video_link',)
    inlines = [ImageTechModelInline, VideoTechModelInline]

    # Метод возвращает HTML-код для отображения изображения детали
    def get_image(self, obj):
        # Проверка, что у объекта есть изображение
        if obj.photo:
            return mark_safe(f'<img src={obj.photo.url} width="100" height="100"')
        else:
            return "No Image"
        
    # Описание атрибута short_description для отображения в админке
    get_image.short_description = "Изображение спецтехники"

    # Метод выводит HTML-код для отображения ссылки на видео с миниатюрой
    def display_short_video_link(self, obj):
        if obj.video:
            # URL к логотипу YouTube
            youtube_logo_url = '/image/logo/pngtree-youtube-logo-icon-png-image_3560545.jpg'
            # Замена части URL для отображения видео во встроенном формате
            embed_url = obj.video.replace('watch?v=', 'embed/')
            return format_html(f'<a href="{embed_url}"><img \
                                src="{youtube_logo_url}" style="border-radius: 50%; width: 50px; height: 50px;"></a>')
        else:
            return "No Video Link"
        
    # Описание атрибута short_description для отображения в админке
    display_short_video_link.short_description = 'Ссылка на видео'
