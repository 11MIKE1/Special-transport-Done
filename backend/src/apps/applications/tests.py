from django.test import TestCase
from .models import Application
from rest_framework.test import APIRequestFactory
from .views import ApplicationViewSet
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.urls import reverse
from rest_framework import status
import re
from django.core.exceptions import ValidationError
from django.core import mail
from unittest.mock import patch
from .email import send_msg
from unittest.mock import ANY
from django.conf import settings


class ApplicationTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Создаем общие данные для всех тестов
        cls.client_name = "MIke"
        cls.description = "Description"
        cls.phone_number = "+996555123456"
        cls.email = "test@example.com"

    def valid_phone_number(value):
    # Проверка, соответствует ли значение регулярному выражению '+996xxxxxxxxx'
        if not re.match(r'^\+996\d{9}$', value):
            # Возбуждение исключения ValidationError в случае некорректного формата
            raise ValidationError("Номер телефона должен быть в формате: '+996xxxxxxxxx'.")

    def test_application_creation(self):
        # Проверяем, что заказ был создан с правильными данными
        application = Application.objects.create(
            client_name=self.client_name,
            description=self.description,
            phone_number=self.phone_number,
            email=self.email
        )
        self.assertEqual(application.client_name, self.client_name)
        self.assertEqual(application.description, self.description)
        self.assertEqual(application.phone_number, self.phone_number)
        self.assertEqual(application.email, self.email)

    def test_order_name_generation(self):
        # Проверяем, что имя заказа создается правильно
        application = Application.objects.create(
            client_name=self.client_name,
            description=self.description,
            phone_number=self.phone_number,
            email=self.email
        )
        expected_order_name = f"{self.client_name}-{timezone.now().strftime('%Y.%m.%d_%H.%M')}"
        self.assertEqual(application.order_name, expected_order_name)

    def test_str_method(self):
        # Проверяем метод __str__ модели
        application = Application.objects.create(
            client_name=self.client_name,
            description=self.description,
            phone_number=self.phone_number,
            email=self.email
        )
        self.assertEqual(str(application), self.client_name)
    
    def test_valid_phone_number(self):
        # Проверяем, что номер телефона с правильным форматом проходит валидацию
        try:
            application = Application.objects.create(
                client_name=self.client_name,
                description=self.description,
                phone_number=self.valid_phone_number,
                email="test@example.com"
            )
        except ValidationError:
            self.fail("Валидный номер телефона не прошел валидацию")

    def test_invalid_phone_number(self):
        # Указываем недопустимый формат номера телефона
        invalid_phone_number = "1234567890"  # Пример недопустимого формата

        # Создаем объект Application
        application = Application(
            client_name=self.client_name,
            description=self.description,
            phone_number=invalid_phone_number,
            email="test@example.com"
        )

        # Пытаемся вызвать метод валидации объекта, который должен вызвать исключение ValidationError
        with self.assertRaises(ValidationError) as context:
            application.full_clean()

        # Если исключение ValidationError не было вызвано, тест считается неудачным
        self.assertTrue('phone_number' in context.exception.message_dict)

    def test_phone_number_verbose_name(self):
        # Проверяем, что verbose_name для поля phone_number правильно настроен
        field_verbose_name = Application._meta.get_field("phone_number").verbose_name
        self.assertEqual(field_verbose_name, "Номер телефона клиента")
    
    def test_order_name_blank(self):
        # Создаем объект Application без указания значения для order_name
        application = Application.objects.create(
            client_name=self.client_name,
            description=self.description,
            phone_number="1234567890",  # Пример неправильного номера телефона
            email="test@example.com"
        )

        # Получаем текущую дату и время
        current_datetime = timezone.now()
        
        # Формируем ожидаемое значение order_name
        expected_order_name = f"{self.client_name}-{current_datetime.strftime('%Y.%m.%d_%H.%M')}"

        # Проверяем, что order_name соответствует ожидаемому значению
        self.assertEqual(application.order_name, expected_order_name)
    
class ApplicationViewSetTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_list_applications(self):
        # Проверяем, что при GET запросе на /applications/ возвращается статус код 200
        view = ApplicationViewSet.as_view({'get': 'list'})
        request = self.factory.get('/applications/')
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_create_application(self):
        url = reverse('application-list')  # Получаем URL для создания заявки
        data = {
            'client_name': 'Mike',
            'description': 'description',
            'phone_number': '+996123456789',
            'email': 'mmm@google.com'
        }
        response = self.client.post(url, data, format='json')  # Отправляем POST-запрос на создание заявки
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)  # Проверяем успешное создание заявки
        self.assertEqual(Application.objects.count(), 1)  # Проверяем, что в базе данных теперь есть одна заявка
        self.assertEqual(Application.objects.get().client_name, 'Mike')  # Проверяем корректность данных заявки

    def test_search_application(self):
        # Проверяем, что при GET запросе на /applications/?search=query возвращается статус код 200
        view = ApplicationViewSet.as_view({'get': 'list'})
        request = self.factory.get('/applications/', {'search': 'query'})
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_filter_application(self):
        # Проверяем, что при GET запросе на /applications/?order_name=query возвращается статус код 200
        view = ApplicationViewSet.as_view({'get': 'list'})
        request = self.factory.get('/applications/', {'order_name': 'query'})
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_order_application(self):
        # Проверяем, что при GET запросе на /applications/?ordering=created_at возвращается статус код 200
        view = ApplicationViewSet.as_view({'get': 'list'})
        request = self.factory.get('/applications/', {'ordering': 'created_at'})
        response = view(request)
        self.assertEqual(response.status_code, 200)


class EmailSendTest(TestCase):
    @patch('apps.applications.email.send_msg.delay')
    def test_send_email_on_application_creation(self, mock_send_delay):
        Application.objects.create(
            client_name="Test User",
            email="test@example.com",
            phone_number="+1234567890",
            description="Test Description"
        )
        mock_send_delay.assert_called_once()

    @patch('django.core.mail.send_mail')
    def test_send_msg_task(self, mock_send_mail):
        application = Application.objects.create(
            client_name="Test User",
            email="test@example.com",
            phone_number="+1234567890",
            description="Test Description"
        )

        mock_send_mail.assert_called_once_with(
            "Ваша заявка принята",
            ANY,  # Можно использовать unittest.mock.ANY, если точное содержание не важно
            settings.EMAIL_HOST_USER,
            [application.email],
            html_message=ANY
            # Используем ANY для html_message, так как его точное содержание может быть сложно проверить
        )
