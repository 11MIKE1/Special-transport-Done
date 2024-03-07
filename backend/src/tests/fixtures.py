import pytest
from django.utils import timezone
from typing import Dict

from backend.src.apps.application.models import Application


@pytest.fixture
def application_data() -> Dict[str, object]:
    return {
        "client_name": "Иван Иванов",
        "description": "Тестовое описание",
        "phone_number": 123456789,
        "email": "ivan@example.com"
    }


@pytest.fixture
def application_instance(
        application_data: Dict[str, object]
        ) -> Application:
    application_data["created"] = timezone.now()
    return Application.objects.create(**application_data)
