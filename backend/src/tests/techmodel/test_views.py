from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.techmodel.models import Brand, TypeName, TechModel
from apps.techmodel.serializers import BrandSerializer, TypeNameSerializer, TechModelSerializer


class BrandViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.brand1 = Brand.objects.create(title='Brand1', country='Country 1')
        self.brand2 = Brand.objects.create(title='Brand2', country='Country 2')

    def test_get_brand_list(self):
        url = reverse('brand-list')
        response = self.client.get(url)
        brands = Brand.objects.all()
        serializer = BrandSerializer(brands, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_filter_brand(self):
        url = reverse('brand-list')
        filter_query = 'Country 1'
        response = self.client.get(url, {'country': filter_query})
        brand = Brand.objects.filter(country=filter_query)
        serializer = BrandSerializer(brand, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
