from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django_resized import ResizedImageField
import os
from django.core.exceptions import ValidationError


# Create your models here.
class Brand(models.Model):
    """ Модель бренда.

    ### Attrs:
    - title (str):
        -Название бренда.
    - country (str):
        -Cтрана бренда.
    """

    title = models.CharField(
        max_length=40,
        help_text="Введите название бренда",
        verbose_name="Название бренда",
    )
    country = models.CharField(
        max_length=40,
        help_text="Введите страну бренда",
        verbose_name="Страна бренда",
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Бренд"
        verbose_name_plural = "Бренды"


class TypeName(models.Model):
    """ Модель вида спецтехники.

    ### Attrs:
    - title (str):
        -Вид спецтехники.
    """

    title = models.CharField(
        max_length=40,
        help_text="Введите вид спецтехники",
        verbose_name="Вид спецтехники",
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Вид спецтехника"
        verbose_name_plural = "Виды спецтехники"


def upload_to(instance, filename):
    # Используйте название детали в качестве имени папки
    folder_name = instance.name
    # Сформируйте путь для загрузки
    upload_path = os.path.join('techmodel_image', folder_name, filename)
    return upload_path

class TechModel(models.Model):
    """ Модель модели спецтехники.

    ### Attrs:
    - name (str):
        -Название спецтехники.
    - existence (str):
        -Наличие детали
    - count (int):
        -Количество моделей спецтехники.
    - price (int):
        -Цена модели спецтехники.
    - brand (FK):
        -Название бренда.
    - type_name (FK):
        -Вид спецтехники.
    - year (int):
        -Год создания спецтехника.
    - description (str):
        -Описание модели спецтехники.
    - photo (img) :
        -Фото спецтехники.
    - video (URL) :
        -Ссылка на видео со спецтехникой.
    """

    AVAILABILITY_CHOICES = (
        ('в_наличии', 'В наличии'),
        ('нет_в_наличии', 'Нет в наличии'),
    )

    name = models.CharField(
        max_length=40,
        verbose_name="Название спецтехники",
    )
    existence = models.CharField(
        max_length=40,
        choices=AVAILABILITY_CHOICES,
        verbose_name="Наличие модели спецтехники",
        help_text="Выберите является ли модель в наличии",
        default='В наличии',
    )
    count = models.PositiveIntegerField(
        help_text="Введите количество моделей спецтехники",
        verbose_name="Количество моделей спецтехники",
        default=0,
    )
    price = models.DecimalField(
        help_text="Введите стоимость модели спецтехники",
        validators=[MinValueValidator(0)],
        max_digits=12,
        decimal_places=2,
        verbose_name="Цена модели спецтехники",
    )
    brand = models.ForeignKey(
        Brand,
        on_delete=models.CASCADE,
        help_text="Введите бренд спецтехники",
        verbose_name="Название бренда",
    )
    type_name = models.ForeignKey(
        TypeName,
        on_delete=models.CASCADE,
        help_text="Введите вид спецтехники",
        verbose_name="Вид спецтехники",
    )
    year = models.IntegerField(
        help_text="Введите год создания детали",
        validators=[
            MinValueValidator(1958, message='Год должен являться четырхзначным числом'),
            MaxValueValidator(2027, message='Год должен являться четырхзначным числом'),
        ],
        verbose_name="Год создания спецтехники",
    )
    description = models.TextField(
        help_text="Введите описание модели спецтехники",
        verbose_name="Описание модели спецтехники",
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
        help_text="Загрузите изображение спецтехники",
        verbose_name="Фото спецтехники",
        blank=True,
        null=True,
    )

    video = models.URLField(
        verbose_name="Ссылка на видео со спецтехникой",
        help_text="Загрузите видео спецтехники",
        blank=True,
        null=True,
    )

    def save(self, *args, **kwargs):
        # Проверяем, что у модели есть ссылка на видео и она является строкой
        # а также содержит подстроку 'watch?v='
        if self.video and isinstance(self.video, str) and 'watch?v=' in self.video:
            # Заменяем часть URL для встраивания видео
            self.video = self.video.replace('watch?v=', 'embed/')

        # Заменяем часть URL для встраивания видео
        super(TechModel, self).save(*args, **kwargs)

    def clean(self):
        if self.video:
            #Поверяем наличие слова 'youtube' в URL-адресе
            if 'youtube' not in self.video:
                raise ValidationError("Некорректная ссылка. Видео должно быть на YouTube")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "Модель спецтехники"
        verbose_name_plural = "Модели спецтехники"


def upload_to_image(instance, filename):
    # Используйте название детали и ее ID в качестве имени папки
    folder_name = f"{instance.tech_model.name}"
    # Сформируйте путь для загрузки
    upload_path = os.path.join('techmodel_image', folder_name, filename)
    return upload_path

class ImageTechModel(models.Model):
    tech_model = models.ForeignKey(TechModel, on_delete=models.CASCADE,
                                   related_name='image_techmodels', verbose_name='Деталь')
    image = ResizedImageField(
        size=[800, 600], quality=85,
        upload_to=upload_to_image,
        help_text="Загрузите изображение спецтехники",
        verbose_name="Фото спецтехники",
        blank=True,
        null=True,
    )

    def __str__(self):
        return f'{self.image}'

    class Meta:
        verbose_name = 'Картинка Спецтехники'
        verbose_name_plural = 'Картинки Спецтехники'


class VideoTechModel(models.Model):
    tech_model = models.ForeignKey(
        TechModel, on_delete=models.CASCADE,
        related_name='video_techmodels', verbose_name='Деталь')
    video = models.URLField(
        verbose_name="Ссылка на видео со спецтехникой",
        help_text="Загрузите видео спецтехники",
        blank=True,
        null=True,
    )

    def save(self, *args, **kwargs):
        # Проверяем, что у модели есть ссылка на видео и она является строкой
        # а также содержит подстроку 'watch?v='
        if self.video and isinstance(self.video, str) and 'watch?v=' in self.video:
            # Заменяем часть URL для встраивания видео
            self.video = self.video.replace('watch?v=', 'embed/')

        # Заменяем часть URL для встраивания видео
        super(VideoTechModel, self).save(*args, **kwargs)

    def clean(self):
        if self.video:
            #Поверяем наличие слова 'youtube' в URL-адресе
            if 'youtube' not in self.video:
                raise ValidationError("Некорректная ссылка. Видео должно быть на YouTube")

    def __str__(self) -> str:
        return self.video

    class Meta:
        verbose_name = 'Видео Спецтехники'
        verbose_name_plural = 'Видео Спецтехники'
