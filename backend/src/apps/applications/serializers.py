from rest_framework import serializers
import re

from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Application.

    Поля:
    - id: Уникальный идентификатор заявки.
    - client_name: Имя клиента.
    - created_at: Дата и время создания заявки.
    - order_name: Название заказа.
    - description: Описание заявки.
    - phone_number: Номер телефона клиента.
    - email: Адрес электронной почты клиента.
    """

    # def validate_phone_number(self, value):
    #     """
    #     Валидация номера телефона.
    #
    #     Проверяет, соответствует ли значение регулярному выражению '+996\d{9}$'.
    #     """
    #     if not re.match(r'\+996\d{9}$', value):
    #         raise serializers.ValidationError("Номер телефона должен содержать 13 цифр, начиная с кода страны '+996'.")
    #
    #     return value

    class Meta:
        model = Application
        fields = (
            'id', 'client_name', 'created_at',
            'order_name', 'description',
            'phone_number', 'email',
        )
