from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView

from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Application
from .serializers import ApplicationSerializer

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response

from .email import send_msg
from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.spareparts.models import SpareParts
from apps.spareparts.serializers import SparePartsSerializer
from apps.techmodel.models import TechModel, Brand, TypeName
from apps.techmodel.serializers import TechModelSerializer, BrandSerializer, TypeNameSerializer


class ApplicationViewSet(ModelViewSet):
    """
    Представление для работы с заявками.

    Атрибуты:
    - queryset: Набор данных, из которого будут извлекаться заявки.
    - serializer_class: Сериализатор, используемый для преобразования заявок в JSON и обратно.
    - filter_backends: Список фильтров, которые могут быть применены к набору данных.
    - search_fields: Поля, по которым можно выполнять поиск.
    - filterset_fields: Поля, по которым можно выполнять фильтрацию.
    - ordering_fields: Поля, по которым можно выполнять сортировку.
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter)
    search_fields = ('order_name',)
    filterset_fields = ('order_name',)
    ordering_fields = ('created_at',)

    @receiver(post_save, sender=Application)
    def send_email_on_application_save(sender, instance, created, **kwargs):
        """
    Функция, которая будет вызвана при сохранении экземпляра модели Application.

    Аргументы:
    - sender: Класс модели, отправивший сигнал (Application в данном случае).
    - instance: Экземпляр модели, который был сохранен.
    - created: Флаг, указывающий, был ли создан новый экземпляр (True при создании, False при обновлении).
    - **kwargs: Дополнительные аргументы.

    Если экземпляр был создан (created=True), задача send_msg.delay() будет запланирована
    с использованием Celery для асинхронной обработки отправки электронной почты.

    Важно убедиться, что Celery Worker запущен для обработки задач.
    """
        if created:
            send_msg.delay(instance.id)  # Отправляем задачу на обработку в Celery

    @swagger_auto_schema(
        operation_description='Приём заказов',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "client_name": openapi.Schema(type=openapi.TYPE_STRING),
                "description": openapi.Schema(type=openapi.TYPE_STRING),
                "phone_number": openapi.Schema(type=openapi.TYPE_STRING),
                'email': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL),
                'whatsapp_number': openapi.Schema(type=openapi.TYPE_STRING),
                'telegram_login': openapi.Schema(type=openapi.TYPE_STRING)

            },
            required=["client_name", "description", "phone_number", "email", "whatsapp_number", "telegram_login"]
        ),
        responses={
            201: openapi.Response(
                description="Заказ успешно создан.",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                        "client_name": openapi.Schema(type=openapi.TYPE_STRING),
                        "created_at": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME),
                        "order_name": openapi.Schema(type=openapi.TYPE_STRING),
                        "description": openapi.Schema(type=openapi.TYPE_STRING),
                        "phone_number": openapi.Schema(type=openapi.TYPE_STRING),
                        "email": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL),
                        'whatsapp_number': openapi.Schema(type=openapi.TYPE_STRING),
                        'telegram_login': openapi.Schema(type=openapi.TYPE_STRING)
                    },
                ),
            ),
            400: openapi.Response(description="Некорректные параметры запроса."),
        },
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Просмотр всех заказов",
        responses={
            200: openapi.Response(
                description="Список всех заказов.",
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                            "client_name": openapi.Schema(type=openapi.TYPE_STRING),
                            "created_at": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME),
                            "order_name": openapi.Schema(type=openapi.TYPE_STRING),
                            "description": openapi.Schema(type=openapi.TYPE_STRING),
                            "phone_number": openapi.Schema(type=openapi.TYPE_STRING),
                            "email": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL),
                            'whatsapp_number': openapi.Schema(type=openapi.TYPE_STRING),
                            'telegram_login': openapi.Schema(type=openapi.TYPE_STRING)
                        },
                    ),
                ),
            ),
        },
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Обновление модели заказа по идентификатору",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "client_name": openapi.Schema(type=openapi.TYPE_STRING),
                "description": openapi.Schema(type=openapi.TYPE_STRING),
                "phone_number": openapi.Schema(type=openapi.TYPE_STRING),
                "email": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL),
                'whatsapp_number': openapi.Schema(type=openapi.TYPE_STRING),
                'telegram_login': openapi.Schema(type=openapi.TYPE_STRING)
            },
            required=["client_name", "description", "phone_number", "email"],
        ),
        responses={
            200: openapi.Response(
                description="Заказ успешно обновлен.",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                        "client_name": openapi.Schema(type=openapi.TYPE_STRING),
                        "created_at": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME),
                        "order_name": openapi.Schema(type=openapi.TYPE_STRING),
                        "description": openapi.Schema(type=openapi.TYPE_STRING),
                        "phone_number": openapi.Schema(type=openapi.TYPE_STRING),
                        "email": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL),
                        'whatsapp_number': openapi.Schema(type=openapi.TYPE_STRING),
                        'telegram_login': openapi.Schema(type=openapi.TYPE_STRING)
                    },
                ),
            ),
            400: openapi.Response(description="Некорректные параметры запроса."),
            404: "Not Found",
        },
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Удаление модели заказа по идентификатору",
        responses={
            204: openapi.Response(description="Заказ успешно удален."),
            404: openapi.Response(description="Заказ не найден."),
        },
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class CombinedSparepartsTechModelsView(APIView):
    def get(self, request, format=None):
        data_from_spareparts = SpareParts.objects.all()
        data_from_techmodel = TechModel.objects.all()
        data_from_brand = Brand.objects.all()
        data_from_typename = TypeName.objects.all()

        spareparts_serializer = SparePartsSerializer(data_from_spareparts, many=True, )
        techmodel_serializer = TechModelSerializer(data_from_techmodel, many=True, )
        brand_serializer = BrandSerializer(data_from_brand, many=True)
        typename_serializer = TypeNameSerializer(data_from_typename, many=True)

        spareparts_data = [item['title'] for item in spareparts_serializer.data]
        techmodel_data = [item['name'] for item in techmodel_serializer.data]

        return Response({
            'data_from_spareparts': spareparts_data,
            'data_from_techmodel': techmodel_data,
            'data_from_brand': brand_serializer.data,
            'data_from_typename': typename_serializer.data,
        })
