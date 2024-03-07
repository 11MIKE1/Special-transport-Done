from django.test import TestCase
from PIL import Image
from django_resized import ResizedImageField
from apps.spareparts.models import SpareParts


class SparePartsModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Создаем тестовый экземпляр SpareParts для использования в тестах
        SpareParts.objects.create(
            title='Деталь 1',
            price=10.50,
            year=2022,
            description='Описание детали 1',
            photo='path/to/photo1.jpg',
            video='https://www.youtube.com/watch?v=video1'
        )

    def test_title_max_length(self):
        # Получаем тестовый экземпляр SpareParts из базы данных
        spare_part = SpareParts.objects.get(id=1)
        # Получаем максимальную длину поля title
        max_length = spare_part._meta.get_field('title').max_length
        # Проверяем что максимальная длина соответствует ожидаемому значению (20)
        self.assertEqual(max_length, 40)

    def test_price_min_value(self):
        # Получаем тестовый экземпляр SpareParts из базы данных
        spare_part = SpareParts.objects.get(id=1)
        # Получаем минимальное значение для поля price
        min_value = spare_part._meta.get_field('price').validators[0].limit_value
        # Проверяем что минимальное значение соответствует ожидаемому значению (0)
        self.assertEqual(min_value, 0)

    def test_year_min_value(self):
        # Получаем тестовый экземпляр SpareParts из базы данных
        spare_part = SpareParts.objects.get(id=1)
        # Получаем минимальное значение для поля year
        min_value = spare_part._meta.get_field('year').validators[0].limit_value
        # Проверяем что минимальное значение соответствует ожидаемому значению (1000)
        self.assertEqual(min_value, 1958)

    def test_year_max_value(self):
        # Получаем тестовый экземпляр SpareParts из базы данных
        spare_part = SpareParts.objects.get(id=1)
        # Получаем максимальное значение для поля year
        max_value = spare_part._meta.get_field('year').validators[1].limit_value
        # Проверяем что максимальное значение соответствует ожидаемому значению (9999)
        self.assertEqual(max_value, 2027)

    def test_str_method(self):
        # Получаем тестовый экземпляр SpareParts из базы данных
        spare_part = SpareParts.objects.get(id=1)
        # Ожидаемая строка для метода __str__
        expected_str = 'Деталь 1'
        # Проверяем что метод __str__ возвращает ожидаемую строку
        self.assertEqual(str(spare_part), expected_str)

    def test_video_field(self):
        # Получаем тестовый экземпляр SpareParts из базы данных
        spare_part = SpareParts.objects.get(id=1)
        # Проверяем что поле video содержит ожидаемое значение
        self.assertEqual(spare_part.video, 'https://www.youtube.com/watch?v=video1')


from apps.applications.models import validate_phone_number, clean_phone_number
from django.core.exceptions import ValidationError


class PhoneNumberValidatorTest(TestCase):
    def test_validate_phone_number_valid(self):
        # Проверяем, что валидатор не вызывает исключения при корректном номере телефона
        try:
            validate_phone_number('+996770112233')
        except ValidationError:
            self.fail("validate_phone_number() raised ValidationError unexpectedly.")

    def test_validate_phone_number_invalid(self):
        # Проверяем, что валидатор вызывает исключение при некорректном номере телефона
        with self.assertRaises(ValidationError):
            validate_phone_number('123456789')  # Некорректный номер

    def test_clean_phone_number(self):
        # Проверяем, что clean_phone_number корректно форматирует номер телефона
        cleaned_phone = clean_phone_number('0770112233')  # Без кода страны
        self.assertEqual(cleaned_phone, '+996770112233')  # Ожидаемый результат

        cleaned_phone = clean_phone_number('+996555445566')  # С кодом страны
        self.assertEqual(cleaned_phone, '+996555445566')  # Ожидаемый результат

    def test_clean_phone_number_invalid(self):
        # Проверяем, что clean_phone_number вызывает исключение при некорректном номере телефона
        with self.assertRaises(ValidationError):
            clean_phone_number('invalid_phone_number')  # Некорректный номер
