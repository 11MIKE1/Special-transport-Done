from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.spareparts.models import SpareParts


class SparePartViewTest(TestCase):

    def setUp(self):
        # Иницализация клиента для API
        self.client = APIClient()
        # Создание тестовых экземпляров модели  SparePart
        self.spare_part1 = SpareParts.objects.create(
            title='Test Part 1', price=100, year=2022)
        self.spare_part2 = SpareParts.objects.create(
            title='Test Part 2', price=150, year=2023)

    def test_get_spare_parts_list(self):
        # Проверка получения списка запасных частей через API
        url = reverse('spareparts-list')
        response = self.client.get(url)
        # Проверяем, что запрос прошел успешно и вернулся ожидаемый статус код
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Проверяем, что количество элементов в ответе соответствует количеству созданных объектов
        self.assertEqual(len(response.data), 2)

    def test_search_spare_part_by_title(self):
        # Проверка поиска запчасти по названию через API
        url = reverse('spareparts-list')  # Получаем URL для списка запчастей
        response = self.client.get(url, {'search': 'Test Part 1'})
        # Проверяем, что запрос прошел успешно и вернулся ожидаемый статус код
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Проверяем, что количество эелементов в ответе равно 1 
        self.assertEqual(len(response.data), 1)
        # Проверяем, что название первой найденной запчасти соответствует ожидаемому
        self.assertEqual(response.data[0]['title'], 'Test Part 1')

    def test_filter_spare_part_by_price(self):
        # Проверка фильтрации запчастей по цене через API
        url = reverse('spareparts-list')  # Получаем URL для списка запчастей
        response = self.client.get(url, {'price': '100.00'})
        # Проверяем, что запрос успешно прошел и вернулся ожидаемый статус код
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Проверяем, что количество элементов в ответе равно 1
        self.assertEqual(len(response.data), 1)
        # Проверяем, что цена первой найденной запчасти соответствует ождаемой
        self.assertEqual(float(response.data[0]['price']), 100)

    def test_filter_spare_part_by_year(self):
        # Проверка фильтрации запчастей по году через API
        url = reverse('spareparts-list')  # Получаем URL для списка запчастей
        response = self.client.get(url, {'year': 2022})
        # Проверяем, что запрос успешно прошел и вернулся ожидаемый статус код
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Проверяем, что количество элементов в ответе равно 1
        self.assertEqual(len(response.data), 1)
        # Проверяем, что год первой найденной запчасти соответствует ождаемой
        self.assertEqual(response.data[0]['year'], 2022)
