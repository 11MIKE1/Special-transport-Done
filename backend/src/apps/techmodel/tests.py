from django.test import TestCase
from .models import Brand, TechModel, TypeName
from rest_framework.test import APIRequestFactory
from .views import TypeNameView, TechModelView, BrandView


class BrandViewTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_list_brand(self):
        # Проверяем, что при GET запросе на /brand/ возвращается статус код 200
        view = BrandView.as_view({'get': 'list'})
        request = self.factory.get('/brand/')
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_create_brand(self):
        # Проверяем, что при POST запросе на /brand/ с правильными данными создается новая запись
        view = BrandView.as_view({'post': 'create'})
        request = self.factory.post('/brand/', data={
            'title': 'Mike',
            'country': 'Russia',
        })
        response = view(request)
        self.assertEqual(response.status_code, 201)  # Проверяем, что создано успешно

    def test_search_brand(self):
        # Проверяем, что при GET запросе на /brand/?search=query возвращается статус код 200
        view = BrandView.as_view({'get': 'list'})
        request = self.factory.get('/brand/', {'search': 'query'})
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_filter_brand(self):
        # Проверяем, что при GET запросе на /brand/?order_name=query возвращается статус код 200
        view = BrandView.as_view({'get': 'list'})
        request = self.factory.get('/brand/', {'order_name': 'query'})
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_order_brand(self):
        # Проверяем, что при GET запросе на /brand/?ordering=created_at возвращается статус код 200
        view = BrandView.as_view({'get': 'list'})
        request = self.factory.get('/brand/', {'ordering': 'created_at'})
        response = view(request)
        self.assertEqual(response.status_code, 200)


# Create your tests here.
class TypeNameViewTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_list_typename(self):
        # Проверяем, что при GET запросе на /typename/ возвращается статус код 200
        view = TypeNameView.as_view({'get': 'list'})
        request = self.factory.get('/typename')
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_create_typename(self):
        # Проверяем, что при POST запросе на /typename/ с правильными данными создается новая запись
        view = TypeNameView.as_view({'post': 'create'})
        request = self.factory.post('/typename/', data={
            'title': 'Mike',
        })
        response = view(request)
        self.assertEqual(response.status_code, 201)  # Проверяем, что создано успешно

    def test_search_typename(self):
        # Проверяем, что при GET запросе на /typename/?search=query возвращается статус код 200
        view = TypeNameView.as_view({'get': 'list'})
        request = self.factory.get('/typename/', {'search': 'query'})
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_filter_typename(self):
        # Проверяем, что при GET запросе на /typename/?order_name=query возвращается статус код 200
        view = TypeNameView.as_view({'get': 'list'})
        request = self.factory.get('/typename/', {'order_name': 'query'})
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_order_typename(self):
        # Проверяем, что при GET запросе на /typename/?ordering=created_at возвращается статус код 200
        view = TypeNameView.as_view({'get': 'list'})
        request = self.factory.get('/typename/', {'ordering': 'created_at'})
        response = view(request)
        self.assertEqual(response.status_code, 200)


class TechModelViewTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_list_techmodel(self):
        # Проверяем, что при GET запросе на /techmodel/ возвращается статус код 200
        view = TechModelView.as_view({'get': 'list'})
        request = self.factory.get('/techmodel/')
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_filter_techmodel(self):
        # Проверяем, что при GET запросе на /techmodel/?order_name=query возвращается статус код 200
        view = TechModelView.as_view({'get': 'list'})
        request = self.factory.get('/techmodel/', {'order_name': 'query'})
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_order_techmodel(self):
        # Проверяем, что при GET запросе на /techmodel/?ordering=created_at возвращается статус код 200
        view = TechModelView.as_view({'get': 'list'})
        request = self.factory.get('/techmodel/', {'ordering': 'created_at'})
        response = view(request)
        self.assertEqual(response.status_code, 200)
