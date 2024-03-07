import pytest
from backend.src.apps.application.models import Application
from django.utils import timezone
from backend.src.tests.conftest import application_data, application_instance


# Тестирование создания экземпляра модели
def test_application_instance_creation(application_instance: Application):
    assert application_instance.client_name == "Иван Иванов"
    assert application_instance.description == "Тестовое описание"
    assert application_instance.phone_number == 123456789
    assert application_instance.email == "ivan@example.com"
    assert application_instance.order_name == f"{application_instance.client_name}_{application_instance.created.strftime('%Y%m%d')}"


# Тестирование логики формирования order_name
def test_order_name_generation(application_data: dict):
    application_data["created"] = timezone.now()
    application = Application(**application_data)
    application.save()
    assert application.order_name == f"{application.client_name}_{application.created.strftime('%Y%m%d')}"


# Тестирование строкового представления модели
def test_application_str_representation(application_instance: Application):
    assert str(application_instance) == application_instance.client_name
