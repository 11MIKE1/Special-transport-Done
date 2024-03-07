from rest_framework.viewsets import ModelViewSet, ViewSet

from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import FilterSet, NumberFilter, ChoiceFilter, BaseInFilter, CharFilter
from rest_framework.views import APIView
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import BrandSerializer, TechModelSerializer, TypeNameSerializer, BrandCountrySerializer, \
    BrandTitleSerializer, TechModelNameSerializer, TechModelExistenceSerializer, TechModelPriceSerializer, \
    BrandAndTypeSerializer
from .models import Brand, TechModel, TypeName

from django.shortcuts import render
import logging


logger = logging.getLogger(__name__)


def brand_list(request):
    # Получаем значения фильтров из GET-параметров запроса
    value1 = request.GET.get('title')
    value2 = request.GET.get('country')

    # Выполняем мульти-фильтрацию на основе предоставленных значений
    queryset = Brand.objects.all()

    if value1:
        queryset = queryset.filter(field1=value1)
    if value2:
        queryset = queryset.filter(field2=value2)

    # Передаем результаты в контекст шаблона
    context = {
        'brands': queryset
    }

    # Отображаем результаты в шаблоне
    return render(request, 'brand_list.html', context)


class BrandView(ModelViewSet):
    """
    Представление для модели Brand.

    Атрибуты:
    - queryset: Набор объектов, с которыми работает представление.
    - serializer_class: Сериализатор, используемый для преобразования объектов в JSON и обратно.
    - filter_backends: Механизмы фильтрации и поиска, используемые в представлении.
    - search_fields: Поля, по которым можно выполнять поиск.
    - filterset_fields: Поля, по которым можно фильтровать набор объектов.
    """
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    search_fields = ('title', 'country',)
    filterset_fields = ('title', 'country',)

    @swagger_auto_schema(
        operation_description="Список всех брендов",
        responses={200: BrandSerializer(many=True)},
        tags=['brand']
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Создание нового бренда",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'country': openapi.Schema(type=openapi.TYPE_STRING),
            },
            required=['title', 'country'],
        ),
        responses={
            201: BrandSerializer(),
            400: "Bad Request",
        },
        tags=['brand']
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description='Получение бренда по идентификатору',
        responses={
            200: BrandSerializer(),
            404: "Not Found",
        },
        tags=['brand']
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Обновление бренда по идентификатору",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'country': openapi.Schema(type=openapi.TYPE_STRING),
            },
            required=['title', 'country'],
        ),
        responses={
            200: BrandSerializer(),
            400: "Bad Request",
            404: "Not Found",
        },
        tags=['brand']
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Удаление бренда по идентификатору",
        responses={
            204: 'No Content',
            404: "Not Found",
        },
        tags=['brand']
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class TypeNameView(ModelViewSet):
    """
    Представление для модели TypeName.

    Атрибуты:
    - queryset: Набор объектов, с которыми работает представление.
    - serializer_class: Сериализатор, используемый для преобразования объектов в JSON и обратно.
    - filter_backends: Механизмы фильтрации и поиска, используемые в представлении.
    - search_fields: Поля, по которым можно выполнять поиск.
    - filterset_fields: Поля, по которым можно фильтровать набор объектов.
    """
    queryset = TypeName.objects.all()
    serializer_class = TypeNameSerializer
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    search_fields = ('title',)
    filterset_fields = ('title',)

    @swagger_auto_schema(
        operation_description="Список всех типов устройств",
        responses={200: TypeNameSerializer(many=True)},
        tags=['typename']
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Создание нового типа устройства",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
            },
            required=['title'],
        ),
        responses={
            201: TypeNameSerializer(),
            400: "Bad Request",
        },
        tags=['typename']
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description='Получение типа устройства по идентификатору',
        responses={
            200: TypeNameSerializer(),
            404: "Not Found",
        },
        tags=['typename']
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Обновление типа устройства по идентификатору",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
            },
            required=['title'],
        ),
        responses={
            200: TypeNameSerializer(),
            400: "Bad Request",
            404: "Not Found",
        },
        tags=['typename']
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Удаление типа устройства по идентификатору",
        responses={
            204: 'No Content',
            404: "Not Found",
        },
        tags=['typename']
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class CharInFilter(BaseInFilter, CharFilter):
    pass


class TechModelFilter(FilterSet):
    name = CharInFilter(field_name='name', lookup_expr='in')
    price = NumberFilter()
    price__gt = NumberFilter(field_name='price', lookup_expr='gt')
    price_lt = NumberFilter(field_name='price', lookup_expr='lt')
    year = NumberFilter()
    year_gte = NumberFilter(field_name='year', lookup_expr='gte')
    year_lte = NumberFilter(field_name='year', lookup_expr='lte')
    existence = ChoiceFilter(choices=TechModel.AVAILABILITY_CHOICES)
    brand = CharInFilter(field_name='brand__title', lookup_expr='in')
    type_name = CharInFilter(field_name='type_name__title', lookup_expr='in')

    class Meta:
        model = TechModel
        fields = ['name', 'brand', 'type_name', 'price', 'year', 'existence']


class TechModelView(ModelViewSet):
    """
    Представление для модели TechModel.

    Атрибуты:
    - queryset: Набор объектов, с которыми работает представление.
    - serializer_class: Сериализатор, используемый для преобразования объектов в JSON и обратно.
    - filter_backends: Механизмы фильтрации и поиска, используемые в представлении.
    - search_fields: Поля, по которым можно выполнять поиск.
    - filterset_fields: Поля, по которым можно фильтровать набор объектов.
    """
    queryset = TechModel.objects.all()
    serializer_class = TechModelSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = TechModelFilter
    search_fields = ['name']

    @swagger_auto_schema(
        operation_description="Список всех моделей устройств \n"
                              "Так же используется для фильтрации и поиска",
        responses={200: TechModelSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Создание новой модели устройства",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING),
                'existence': openapi.Schema(type=openapi.TYPE_STRING),
                'count': openapi.Schema(type=openapi.TYPE_NUMBER),
                'brand': openapi.Schema(type=openapi.TYPE_STRING),
                'type_name': openapi.Schema(type=openapi.TYPE_STRING),
                'year': openapi.Schema(type=openapi.TYPE_INTEGER),
                'price': openapi.Schema(type=openapi.TYPE_NUMBER),
                'additional': openapi.Schema(type=openapi.TYPE_STRING),
                'characteristic': openapi.Schema(type=openapi.TYPE_STRING),
                'photo': openapi.Schema(type=openapi.FORMAT_URI),
                'video': openapi.Schema(type=openapi.FORMAT_URI),
            },
            required=['name', 'brand', 'type_name', 'year', 'price', 'description', 'characteristic', 'additional',
                      'photo', 'video'],
        ),
        responses={
            201: TechModelSerializer(),
            400: "Bad Request",
        },
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description='Получение модели устройства по идентификатору',
        responses={
            200: TechModelSerializer(),
            404: "Not Found",
        },
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Обновление модели устройства по идентификатору",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING),
                'existence': openapi.Schema(type=openapi.TYPE_STRING),
                'count': openapi.Schema(type=openapi.TYPE_NUMBER),
                'price': openapi.Schema(type=openapi.TYPE_NUMBER),
                'brand': openapi.Schema(type=openapi.TYPE_STRING),
                'type_name': openapi.Schema(type=openapi.TYPE_STRING),
                'year': openapi.Schema(type=openapi.TYPE_INTEGER),
                'description': openapi.Schema(type=openapi.TYPE_STRING),
                'additional': openapi.Schema(type=openapi.TYPE_STRING),
                'characteristic': openapi.Schema(type=openapi.TYPE_STRING),
                'photo': openapi.Schema(type=openapi.FORMAT_URI),
                'video': openapi.Schema(type=openapi.FORMAT_URI),
            },
            required=['name', 'brand', 'type_name', 'year', 'price', 'description', 'characteristic', 'additional',
                      'photo', 'video'],
        ),
        responses={
            200: TechModelSerializer(),
            400: "Bad Request",
            404: "Not Found",
        },
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Удаление модели устройства по идентификатору",
        responses={
            204: 'No Content',
            404: "Not Found",
        },
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        logger.debug('TechModel list requested')
        response = super().list(request, *args, **kwargs)
        logger.debug(f'TechModel list response: {response.data}')
        return response

    def get_queryset(self):
        queryset = super().get_queryset()
        logger.debug(f"Query params: {self.request.query_params}")
        return queryset


class BrandAndTypeView(ViewSet):
    """
    Представление, которое возвращает список брендов и типов устройств.
    """

    def list(self, request, *args, **kwargs):
        brands = Brand.objects.all()
        types = TypeName.objects.all()
        brands_data = BrandSerializer(brands, many=True).data
        types_data = TypeNameSerializer(types, many=True).data
        data = {
            'brands': brands_data,
            'types': types_data,
        }
        return Response(data)