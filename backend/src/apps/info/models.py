from django.db import models
import os


def upload_to(instance, filename):
    folder_name = 'info_images'
    return os.path.join(folder_name, filename)


# Create your models here.
class Info(models.Model):
    mainPageTitle = models.CharField(
        help_text="Заголовок главного сладйа на главной странице",
        max_length=200,
        verbose_name='Заголовок главного сладйа',
    )
    mainPageDescription = models.TextField(
        verbose_name='Главный слайд - описание'
    )
    mainPageFormImage = models.ImageField(
        upload_to=upload_to,
        verbose_name='Изображение внизу главной странциы рядом с формой',
        help_text='Изображение внизу главной странциы рядом с формо'
    )
    advantagesOne = models.TextField(
        verbose_name='Преимущества - первый блок',
    )
    advantagesTwo = models.TextField(
        verbose_name='Преимущества - второй блок',
    )
    advantagesThree = models.TextField(
        verbose_name='Преимущества - третий блок',
    )
    renovationWorkTitle = models.CharField(
        help_text="Заголовок ремонтных работ",
        max_length=200,
        verbose_name='Заголовок ремонтных работ',
    )
    renovationWorkDescription = models.TextField(
        verbose_name='Ремонтные работы - текст',
    )
    renovationWorkImage = models.ImageField(
        upload_to=upload_to,
        verbose_name='Изображение ремонтных работ',
        help_text='Изображение ремонтных работ'
    )
    serviceStationTitle = models.CharField(
        help_text="Заголовок станции СТО",
        max_length=200,
        verbose_name='Заголовок станции СТО',
    )
    serviceStationDescription = models.TextField(
        verbose_name='Станции СТО - текст',
    )
    serviceStationImage = models.ImageField(
        upload_to=upload_to,
        verbose_name='Изображение станции СТО',
        help_text='Изображение станции СТО'
    )
    shippingTitle = models.CharField(
        help_text="Заголовок перевозки",
        max_length=200,
        verbose_name='Заголовок перевозки',
    )
    shippingDescription = models.TextField(
        verbose_name='Перевозки - текст'
    )
    shippingImage = models.ImageField(
        upload_to=upload_to,
        verbose_name='Изображение перевозки',
        help_text='Изображение перевозки'
    )
    aboutTitle = models.CharField(
        help_text="Заголовок О компании",
        max_length=200,
        verbose_name='Заголовок О компании',
    )
    aboutDescription = models.TextField(
        verbose_name='О компании - текст'
    )
    aboutImageOne = models.ImageField(
        upload_to=upload_to,
        verbose_name='Изображение в первом блоке О нас',
        help_text='Изображение в первом блоке О нас'
    )
    aboutImageTwo = models.ImageField(
        upload_to=upload_to,
        verbose_name='Изображение во втором блоке О нас',
        help_text='Изображение во втором блоке О нас'
    )
    aboutBlocOneTitle = models.CharField(
        help_text="Первый блок О нас, заголовок",
        max_length=200,
        verbose_name='Первый блок О нас, заголовок',
    )
    aboutBlocTwoTitle = models.CharField(
        help_text="Второй блок О нас, заголовок",
        max_length=200,
        verbose_name='Второй блок О нас, заголовок',
    )
    aboutBlocOneDescription = models.TextField(
        verbose_name='Первый блок О нас, текст'
    )
    aboutBlocTwoDescription = models.TextField(
        verbose_name='Второй блок О нас, текст'
    )
    privacy_policy = models.TextField(
        verbose_name='Политика конфидациальности'
    )
    termsOfUse = models.TextField(
        verbose_name='Условия использования'
    )

    class Meta:
        verbose_name = "Информация на сайте"
        verbose_name_plural = "Информация на сайте"


class Footer(models.Model):
    city = models.CharField(
        verbose_name='Название города',
        max_length=100,
        help_text='Название города'
    )
    address = models.CharField(
        verbose_name='Улица и дом',
        max_length=200,
        help_text='Улица и дом'
    )
    phoneNumber = models.CharField(
        verbose_name='Номер телефона',
        max_length=100,
        help_text='Номер телефона'
    )
    whatsApp = models.CharField(
        verbose_name='Номер или ссылка на ватсап',
        max_length=150,
        help_text='Номер или ссылка на ватсап'
    )
    telegram = models.CharField(
        verbose_name='Номер или ссылка на телеграм',
        max_length=150,
        help_text='Номер или ссылка на телеграм'
    )
    instagram = models.CharField(
        verbose_name='Ссылка на инстаграм',
        max_length=150,
        help_text='Ссылка на инстаграм'
    )
    facebook = models.CharField(
        verbose_name='Ссылка на фейсбук',
        max_length=150,
        help_text='Ссылка на фейсбук'
    )

    class Meta:
        verbose_name = "Информация в футере (нижней части экрана)"
        verbose_name_plural = "Информация в футере (нижней части экрана)"


class mainSlider(models.Model):
    mainSlider = models.ImageField(
        upload_to=upload_to,
        verbose_name='Фотографии для основного слайдера на главной странице',
        help_text='Фотографии для основного слайдера на главной странице'
    )

    class Meta:
        verbose_name = "Фотография для главного сладейра"
        verbose_name_plural = "Фотографии для главного сладейров"

class popularSlider(models.Model):
    popularSlider = models.ImageField(
        upload_to=upload_to,
        verbose_name='Фотографии для популярной техники',
        help_text='Фотографии для популярной техники'
    )

    class Meta:
        verbose_name = "Фотография для сладейра популярная техника"
        verbose_name_plural = "Фотографии для сладейра популярная техника"