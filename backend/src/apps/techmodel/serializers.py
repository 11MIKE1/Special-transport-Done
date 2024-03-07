from rest_framework import serializers

from .models import Brand, TypeName, TechModel, ImageTechModel, VideoTechModel


class BrandSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Brand.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы.
    """

    class Meta:
        model = Brand
        fields = (
            'id', 'title', 'country',
        )


class TypeNameSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели TypeName.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы.
    """

    class Meta:
        model = TypeName
        fields = (
            'id', 'title',
        )


class ImageTechModelSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели ImageTechModel.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы.
    """

    class Meta:
        model = ImageTechModel
        fields = (
            'id', 'tech_model', 'image',
        )


class VideoTechModelSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели VideoTechModel.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы.
    """

    class Meta:
        model = VideoTechModel
        fields = (
            'id', 'tech_model', 'video',
        )


class TechModelSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели TechModel.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы.
    """

    # Включаем вложенные сериализаторы для связанных моделей
    image_techmodels = ImageTechModelSerializer(many=True, read_only=True)
    video_techmodels = VideoTechModelSerializer(many=True, read_only=True)
    brand_name = serializers.CharField(source='brand.title', read_only=True)
    type_name_title = serializers.CharField(source='type_name.title', read_only=True)

    class Meta:
        model = TechModel
        fields = [
            'id', 'name', 'existence', 'count', 'price', 'year', 'description', 'photo',
            'video', 'characteristic', 'additional', 'brand_name', 'type_name_title',
            'image_techmodels', 'video_techmodels'
        ]
        depth = 1

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


class BrandAndTypeSerializer(serializers.Serializer):
    brands = BrandSerializer(many=True)
    types = TypeNameSerializer(many=True)


class BrandTitleSerializer(serializers.ModelSerializer):
    """
    Сериализатор для фильтрации бренда по названию.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы.
    """

    class Meta:
        model = Brand
        fields = (
            'id', 'title',
        )


class BrandCountrySerializer(serializers.ModelSerializer):
    """
    Сериализатор для фильтрации бренда по стране.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы.
    """

    class Meta:
        model = Brand
        fields = (
            'id', 'country',
        )


class TechModelPriceSerializer(serializers.ModelSerializer):
    """
    Сериализатор для фильтрации техмодели по стоимости.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы.
    """

    class Meta:
        model = TechModel
        fields = (
            'id', 'price',
        )


class TechModelYearSerializer(serializers.ModelSerializer):
    """
    Сериализатор для фильтрации техмодели по году выпуска.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы.
    """

    class Meta:
        model = TechModel
        fields = (
            'id', 'year',
        )


class TechModelNameSerializer(serializers.ModelSerializer):
    """
    Сериализатор для фильтрации техмодели по названию.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы.
    """

    class Meta:
        model = TechModel
        fields = (
            'id', 'name',
        )


class TechModelExistenceSerializer(serializers.ModelSerializer):
    """
    Сериализатор для фильтрации техмодели по наличию.

    Атрибуты:
    - model: Модель, с которой работает сериализатор.
    - fields: Поля модели, которые будут сериализованы.
    """

    class Meta:
        model = TechModel
        fields = (
            'id', 'existence',
        )
