from django.db import models
import re
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


# Валидатор для проверки формата номера телефона

def validate_phone_number(value):
    # Проверка, соответствует ли значение регулярному выражению '+996xxxxxxxxx'
    if not re.match(r'^\+996\d{9}$', value):
        # Возбуждение исключения ValidationError в случае некорректного формата
        raise ValidationError("Номер телефона должен быть в формате: '+996xxxxxxxxx'.")


# Функция для очистки и форматирования номера телефона
def clean_phone_number(phone_number):
    try:
        # Замена начального '0' на код страны '+996'
        phone_number = re.sub(r'^0', '+996', phone_number)

        # Проверка формата номера телефона с использованием валидатора
        validate_phone_number(phone_number)

        # Возвращаем отформатированный номер телефона
        return phone_number
    except ValidationError as e:

        print(f"Ошибка валидации номера телефона: {e.detail}")
        raise


# Create your models here.
class Application(models.Model):
    """ Модель заказа.

    ### Attrs:
    - client_name (str):
        -Имя клиента.
    - created_at (datetime):
        -Дата и время создания заказа.
    - order_name (str):
        -Имя заказа.
    - description (str):
        -Описание заказа.
    - phone_number (int) :
        -Номер телефона клиента.
    - email (email) :
        -Email клиента.
    """

    client_name = models.CharField(

        help_text="Введите имя клиента",
        max_length=100,
        verbose_name="Имя Клиента",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Введите время и дату создания заказа",
        verbose_name="Дата создания",
    )
    order_name = models.CharField(
        max_length=38,
        help_text="Автоматическая генерация названия заказа",
        blank=True,
        verbose_name="Название заказа",
    )
    description = models.TextField(
        help_text="Введите описание заказа",
        verbose_name="Описание заказа",
        null=True,
        blank=True,
    )
    phone_number = models.CharField(
        # validators=[validate_phone_number],
        max_length=13,
        help_text="Введите телефон клиента в формате: +996xxxxxxxxx",
        verbose_name="Номер телефона клиента",
        null=True,
        blank=True,
    )
    whatsapp_number = models.CharField(
        validators=[validate_phone_number],
        max_length=13,
        help_text="Введите телефон клиента в формате (whatsapp): +996xxxxxxxxx",
        verbose_name="Номер телефона клиента",
        blank=True,
        null=True,
    )
    telegram_login = models.CharField(
        help_text="Ссылка на логин в телеграме",
        verbose_name="Ссылка телеграм",
        blank=True,
        null=True,

    )
    email = models.EmailField(
        help_text="Введите почту клиента",
        verbose_name="Email клиента",
    )

    def save(self, *args, **kwargs):
        # Если объект только что создан (не был изменен)
        if not self.pk:
            # Создаем имя заказа с датой и временем создания
            self.order_name = f"{self.client_name}-{timezone.now().strftime('%Y.%m.%d_%H.%M')}"
        else:
            # Если объект уже существует, оставляем имя заказа без изменений
            self.order_name = f"{self.client_name}"
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.client_name

    class Meta:
        verbose_name = "Заказы"
        verbose_name_plural = "Заказы"
