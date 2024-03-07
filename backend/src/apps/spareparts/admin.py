from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.html import format_html
from .models import SpareParts, ImageSparePart, VideoSparePart


class ImageSparePartInline(admin.TabularInline):
    model = ImageSparePart
    extra = 1


class VideoSparePartInline(admin.TabularInline):
    model = VideoSparePart
    extra = 1


@admin.register(SpareParts)
class SparePartsAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'get_image', 'display_short_video_link',)
    list_display_links = ('title', 'get_image',)
    list_filter = ('title', 'year', 'price',)
    search_fields = ('title', 'price', 'year',)
    save_on_top = True
    save_as = True
    readonly_fields = ('display_short_video_link',)
    inlines = [ImageSparePartInline, VideoSparePartInline]

    # Метод выводит первые 20 символов описания детали
    def short_description(self, obj):
        return obj.description[:20]
    
    # Описание атрибута short_description для отображения в админке
    short_description.short_description = 'Описание детали'

    # Метод возвращает HTML-код для отображения изображения детали
    def get_image(self, obj):
        # Проверка, что у объекта есть изображение
        if obj.photo:
            return mark_safe(f'<img src={obj.photo.url} width="100" height="100"')
        else:
            return "No Image"

    # Описание атрибута short_description для отображения в админке
    get_image.short_description = "Изображение детали"

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
