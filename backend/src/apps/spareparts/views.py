from rest_framework.viewsets import ModelViewSet

from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from django_filters import FilterSet, NumberFilter, ChoiceFilter, BaseInFilter, CharFilter

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import SpareParts
from .serializers import SparePartsSerializer,SparePartsExistenceSerializer,SparePartsPriceSerializer,SparePartsYearSerializer,SparePartsTitleSerializer


class CharInFilter(BaseInFilter, CharFilter):
    pass


class SparePartsFilter(filters.FilterSet):
    title = CharInFilter(field_name='title', lookup_expr='in')
    price_gt = NumberFilter(field_name='price', lookup_expr='gt')
    price_lt = NumberFilter(field_name="price", lookup_expr='lt')
    year_gt = NumberFilter(field_name="year", lookup_expr='gt')
    year_lt = NumberFilter(field_name="year", lookup_expr='lt')
    existence = ChoiceFilter(choices=SpareParts.AVAILABILITY_CHOICES)

    class Meta:
        model = SpareParts
        fields = ['title', 'existence', 'price', 'year']


class SparePartView(ModelViewSet):
    """
    Атрибуты:
    - queryset: Набор объектов, с которыми работает представление.
    - serializer_class: Сериализатор, используемый для преобразования данных.
    - filter_backends: Механизмы фильтрации и поиска, используемые в представлении.

    Операции:
    - list: Получение списка всех запчастей.
    - create: Создание новой запчасти.
    - retrieve: Получение информации о запчасти по идентификатору.
    - update: Обновление информации о запчасти по идентификатору.
    - destroy: Удаление запчасти по идентификатору.
    """
    queryset = SpareParts.objects.all()
    serializer_class = SparePartsSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend)
    filterset_class = SparePartsFilter
    search_fields = ('title',)



    @swagger_auto_schema(
        operation_description="Список всех запчастей\n"
                              "Так же используется для фильтрации и поиска",
        responses={200: SparePartsSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        """
        Получение списка всех запчастей.
        
        Параметры запроса:
        - search: поиск по названию запчастей.
        
        :param request: объект запроса.
        :return: список всех запчастей
        """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Создание новой запчасти",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'existence': openapi.Schema(type=openapi.TYPE_STRING),
                'count': openapi.Schema(type=openapi.TYPE_NUMBER),
                'price': openapi.Schema(type=openapi.TYPE_NUMBER),
                'year': openapi.Schema(type=openapi.TYPE_INTEGER),
                'description': openapi.Schema(type=openapi.TYPE_STRING),
                'additional': openapi.Schema(type=openapi.TYPE_STRING),
                'characteristic': openapi.Schema(type=openapi.TYPE_STRING),
                'photo': openapi.Schema(type=openapi.FORMAT_URI),
                'video': openapi.Schema(type=openapi.FORMAT_URI),
            },
            required=['title', 'price', 'year', 'description', 'additional', 'characteristic', 'photo', 'video'],
        ),
        responses={
            201: SparePartsSerializer(),
            400: "Bad Request",
        },
    )
    def create(self, request, *args, **kwargs):
        """
        Создание новой запчасти.
        
        :param request: объект запроса.
        :return: созданная запчасть.
        """
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description='Получение запчасти по идентификатору',
        responses={
            200: SparePartsSerializer(),
            404: "Not Found",
        },
    )
    def retrieve(self, request, *args, **kwargs):
        """
        Получение информации о запчасти по идентификатору.
        
        :param request: объект запроса.
        :return: информация о запчаси.
        """
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Обновление запчасти по идентификатору",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'existence': openapi.Schema(type=openapi.TYPE_STRING),
                'count': openapi.Schema(type=openapi.TYPE_NUMBER),
                'price': openapi.Schema(type=openapi.TYPE_NUMBER),
                'year': openapi.Schema(type=openapi.TYPE_INTEGER),
                'description': openapi.Schema(type=openapi.TYPE_STRING),
                'additional': openapi.Schema(type=openapi.TYPE_STRING),
                'characteristic': openapi.Schema(type=openapi.TYPE_STRING),
                'photo': openapi.Schema(type=openapi.FORMAT_URI),
                'video': openapi.Schema(type=openapi.FORMAT_URI),
            },
            required=['title', 'price', 'year', 'description', 'additional', 'characteristic', 'photo', 'video'],
        ),
        responses={
            200: SparePartsSerializer(),
            400: "Bad Request",
            404: "Not Found",
        },
    )
    def update(self, request, *args, **kwargs):
        """
        Обновление информации о запчасти по идентификатору.
        
        :param request: объект запроса.
        :return: обновленная запчась.
        """
        return super().update(request, *args, **kwargs)

    swagger_auto_schema(
        operation_description="Удаление запчасти по идентификатору",
        responses={
            204: 'No Content',
            404: "Not Found",
        },
    )

    def destroy(self, request, *args, **kwargs):
        """
        Удаление запчасти по идентификатору.
        
        :param request: объект запроса.
        :return: подтверждение удаления.
        """
        return super().destroy(request, *args, **kwargs)
    

