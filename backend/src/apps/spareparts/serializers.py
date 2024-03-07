from rest_framework import serializers

from .models import SpareParts, ImageSparePart, VideoSparePart


class ImageSparePartSerializer(serializers.ModelSerializer):
    """
    Сериализатор для изображения запчасти.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы и десериализованы.
    """
    class Meta:
        model = ImageSparePart
        fields = (
            'id', 'image','spare_part',
        )


class VideoSparePartSerializer(serializers.ModelSerializer):
    """
    Сериализатор для видео запчасти.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы и десериализованы.
    """
    class Meta:
        model = VideoSparePart
        fields = (
            'id', 'spare_part', 'video',
        )


class SparePartsSerializer(serializers.ModelSerializer):
    """
    Сериализатор для запчастей.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы и десериализованы.
    """

    # Включаем вложенные сериализаторы для связанных моделей
    video_spareparts = VideoSparePartSerializer(many=True, read_only=True)
    image_spareparts = ImageSparePartSerializer(many=True, read_only=True)
    class Meta:
        model = SpareParts
        fields = (
            'id', 'price', 'year',
            'title', 'description',
            'photo', 'video',
            'characteristic', 'additional',
            'existence', 'count',
            'image_spareparts', 'video_spareparts',
        )

    def validate_video(self, value):
        """
        Проверяет корректность ссылки на видео.

        Args:
            value (str): Значение поля 'video'.

        Raises:
            serializers.ValidationError: Возникает, если ссылка не содержит слово 'youtube'.

        Returns:
            str: Возвращает проверенное значение поля 'video'.
        """
        # Проверяем, что значение не пустое и не содержит слово 'youtube'
        if value and 'youtube' not in value:
            raise serializers.ValidationError("Некорректная ссылка. Видео должно быть на YouTube")
        return value

class SparePartsTitleSerializer(serializers.ModelSerializer):
    """
    Сериализатор для фильтрации запчастей по названию.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы и десериализованы.
    """

    class Meta:
        model = SpareParts
        fields = (
            'id','title',
        )


class SparePartsYearSerializer(serializers.ModelSerializer):
    """
    Сериализатор для фильтрации запчастей по году выпуска.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы и десериализованы.
    """

    class Meta:
        model = SpareParts
        fields = (
           'id','year',
        )


class SparePartsPriceSerializer(serializers.ModelSerializer):
    """
    Сериализатор для фильтрации запчастей по стоимости.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы и десериализованы.
    """

    class Meta:
        model = SpareParts
        fields = (
            'id','price',
        )


class SparePartsExistenceSerializer(serializers.ModelSerializer):
    """
    Сериализатор для фильтрации запчастей по наличию.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы и десериализованы.
    """

    class Meta:
        model = SpareParts
        fields = (
            'id','existence',
        )
