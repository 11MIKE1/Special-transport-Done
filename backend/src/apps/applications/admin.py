from django.contrib import admin

from .models import Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('order_name',
                    'email', 'phone_number',)
    list_display_links = ('order_name',
                          'email', 'phone_number',)
    list_filter = ('created_at', 'order_name',)
    search_fields = ('order_name',
                     'email', 'phone_number',)
    save_on_top = True
    save_as = True


admin.site.site_title = "Спецтехника"
admin.site.site_header = "Спецтехника"
