from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django_resized import ResizedImageField
import os
from django.core.exceptions import ValidationError


def upload_to(instance, filename):
    # Используйте название детали в качестве имени папки
    folder_name = instance.title
    # Сформируйте путь для загрузки
    upload_path = os.path.join('sparepart_image', folder_name, filename)
    return upload_path

class SpareParts(models.Model):
    """ Модель детали.

    ### Attrs:
    - title (str):
        -Название детали
    - existence (str):
        -Наличие детали
    - count (int):
        -Количество деталей.
    - price (int):
        -Цена детали.
    - year (int):
        -Год создания детали
    - description (str):
        -Описание детали
    - photo (img) :
        -Картинка детали
    - video (URL) :
        -Ссылка на видео детали"
    """
    AVAILABILITY_CHOICES = (
        ('в_наличии', 'В наличии'),
        ('нет_в_наличии', 'Нет в наличии'),
    )

    title = models.CharField(
        help_text="Введите название детали",
        max_length=40,
        verbose_name="Название детали",
    )

    existence = models.CharField(
        max_length=40,
        choices=AVAILABILITY_CHOICES,
        help_text="Выберите является ли деталь в наличии",
        verbose_name="Наличие детали",
        default='В наличии',
    )

    count = models.PositiveIntegerField(
        help_text="Введите количество деталий",
        verbose_name="Количество деталей",
        default=0,
    )

    price = models.DecimalField(
        help_text="Введите стоимость детали",
        validators=[MinValueValidator(0)],
        max_digits=12, decimal_places=2,
        verbose_name="Цена детали",
    )
    year = models.IntegerField(
        help_text="Введите год создания детали",
        validators=[
            MinValueValidator(1958, message='Год должен являться четырхзначным числом'),
            MaxValueValidator(2027, message='Год должен являться четырхзначным числом'),
        ],
        verbose_name="Год создания детали",
    )
    description = models.TextField(
        help_text="Введите описание детали",
        verbose_name="Описание детали",
    )
    characteristic = models.TextField(
        help_text="Введите характеристику детали",
        verbose_name="Характеристика детали",
        null=True,
        blank=True,
    )
    additional = models.TextField(
        help_text="Введите дополнение к деталю",
        verbose_name="Дополнительное",
        null=True,
        blank=True,
    )
    photo = ResizedImageField(
        size=[800, 600], quality=85,
        upload_to=upload_to,
        help_text="Загрузите изображение детали",
        verbose_name="Картинка детали",
        blank=True,
        null=True,
    )
    video = models.URLField(
        help_text="Введите ссылку на видео детали",
        verbose_name="Ссылка на видео детали",
        blank=True,
        null=True,
    )

    def save(self, *args, **kwargs):
        # Проверяем, что у модели есть ссылка на видео и она является строкой
        # а также содержит подстроку 'watch?v='
        if self.video and isinstance(self.video, str) and 'watch?v=' in self.video:
            # Заменяем часть URL для встраивания видео
            self.video = self.video.replace('watch?v=', 'embed/')

        # Вызываем метод save родительского класса для сохранения изменений
        super(SpareParts, self).save(*args, **kwargs)

    def clean(self):
        if self.video:
            # Проверяем наличие слова "youtube" в URL-адресе
            if 'youtube' not in self.video:
                raise ValidationError("Некорректная ссылка. Видео должно быть на YouTube")    

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Детали"
        verbose_name_plural = "Детали"


def upload_to_image(instance, filename):
    # Используйте название детали и ее ID в качестве имени папки
    folder_name = f"{instance.spare_part.title}"
    # Сформируйте путь для загрузки
    upload_path = os.path.join('sparepart_image', folder_name, filename)
    return upload_path

class ImageSparePart(models.Model):
    spare_part = models.ForeignKey(
        SpareParts, on_delete=models.CASCADE,
        related_name='image_spareparts', verbose_name='Деталь')
    image = ResizedImageField(
        size=[800, 600], quality=85,
        upload_to=upload_to_image,
        help_text="Загрузите изображение детали",
        verbose_name="Картинка детали",
        blank=True,
        null=True,
    )

    def __str__(self):
        return f'{self.image}'

    class Meta:
        verbose_name = 'Картинка Детали'
        verbose_name_plural = 'Картинки Детали'


class VideoSparePart(models.Model):
    spare_part = models.ForeignKey(SpareParts, on_delete=models.CASCADE,
                                   related_name='video_spareparts', verbose_name='Деталь')
    video = models.URLField(
        help_text="Введите ссылку на видео детали",
        verbose_name="Ссылка на видео детали",
        blank=True,
        null=True,
    )

    def save(self, *args, **kwargs):
        # Проверяем, что у модели есть ссылка на видео и она является строкой
        # а также содержит подстроку 'watch?v='
        if self.video and isinstance(self.video, str) and 'watch?v=' in self.video:
            # Заменяем часть URL для встраивания видео
            self.video = self.video.replace('watch?v=', 'embed/')

        # Вызываем метод save родительского класса для сохранения изменений
        super(VideoSparePart, self).save(*args, **kwargs)

    def clean(self):
        if self.video:
            # Проверяем наличие слова "youtube" в URL-адресе
            if 'youtube' not in self.video:
                raise ValidationError("Некорректная ссылка. Видео должно быть на YouTube")

    def __str__(self) -> str:
        return self.video

    class Meta:
        verbose_name = 'Видео Детали'
        verbose_name_plural = 'Видео Детали'
