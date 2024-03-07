from django.test import TestCase
from django.core.validators import \
    MaxLengthValidator, MinValueValidator, MaxValueValidator

from apps.techmodel.models import Brand, TypeName, TechModel


class BrandTest(TestCase):
    # Создание тестовых данных
    @classmethod
    def setUpTestData(cls):
        Brand.objects.create(
            title='Название бренда',
            country='Страна бренда'
        )

    # Проверка максимальной длины поля title
    def test_title_max_length(self):
        brand = Brand.objects.get(id=1)
        max_length = brand._meta.get_field('title').max_length
        self.assertEqual(max_length, 40)

    # Проверка максимальной длины поля country
    def test_country_max_length(self):
        brand = Brand.objects.get(id=1)
        max_length = brand._meta.get_field('country').max_length
        self.assertEqual(max_length, 40)

    # Проверка содержимого поля title
    def test_title_content(self):
        brand = Brand.objects.get(id=1)
        expected_obj_title = f'{brand.title}'
        self.assertEqual(expected_obj_title, 'Название бренда')

    # Проверка содержимого поля country
    def test_country_content(self):
        brand = Brand.objects.get(id=1)
        expected_obj_country = f'{brand.country}'
        self.assertEqual(expected_obj_country, 'Страна бренда')


class TypeNameTest(TestCase):
    # Создание тестовых данных
    @classmethod
    def setUpTestData(cls):
        TypeName.objects.create(
            title='Вид техники'
        )

    # Проверка максимальной длины поля title
    def test_title_max_length(self):
        type_name = TypeName.objects.get(id=1)
        max_length = type_name._meta.get_field('title').max_length
        self.assertEqual(max_length, 40)

    # Проверка содержимого поля title
    def test_title_content(self):
        type_name = TypeName.objects.get(id=1)
        expected_obj_title = f'{type_name.title}'
        self.assertEqual(expected_obj_title, 'Вид техники')


class TechModelTest(TestCase):
    # Создание тестовых данных
    @classmethod
    def setUpTestData(cls):
        brand = Brand.objects.create(
            title='Название бренда', country='Страна бренда')
        type_name = TypeName.objects.create(title='Вид техники')
        TechModel.objects.create(
            name='Tech Test',
            price=1000,
            brand=brand,
            type_name=type_name,
            year=2022,
            description='Test description',
            photo='photos/test,jpg',
            video='https://www.example.com/test'
        )

    # Проверка максимальной длины поля name
    def test_name_max_length(self):
        tech = TechModel.objects.get(id=1)
        max_length = tech._meta.get_field('name').max_length
        self.assertEqual(max_length, 40)

    # Проверка минимального значения цены
    def test_price_min_value(self):
        tech = TechModel.objects.get(id=1)
        min_value = tech._meta.get_field('price').validators[0].limit_value
        self.assertEqual(min_value, 0)

    # Проверка максимального значения года
    def test_year_max_value(self):
        tech = TechModel.objects.get(id=1)
        max_value_validator = next(validator for validator in
                                   tech._meta.get_field('year').validators if
                                   isinstance(validator, MaxValueValidator))
        self.assertEqual(max_value_validator.limit_value, 2027)

        # Проверка минимального значения года

    def test_year_min_value(self):
        tech = TechModel.objects.get(id=1)
        min_value_validator = next(validator for validator in
                                   tech._meta.get_field('year').validators if
                                   isinstance(validator, MinValueValidator))
        self.assertEqual(min_value_validator.limit_value, 1958)

        # Проверка корректности метода __str__ модели

    def test_str_mathod(self):
        tech = TechModel.objects.get(id=1)
        self.assertEqual(str(tech), 'Tech Test')
