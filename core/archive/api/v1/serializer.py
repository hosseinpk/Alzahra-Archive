from rest_framework import serializers
from archive.models import Archive, Category, Project, AssetType


class ArchiveSerializer(serializers.ModelSerializer):
    absolute_url = serializers.SerializerMethodField()

    class Meta:
        model = Archive
        fields = [
            "id",
            "name",
            "description",
            "status",
            "image",
            "created_date",
            "absolute_url",
            "file",
            "project",
            "asset_type",
            "category",
        ]

    def get_absolute_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.pk)

    def to_representation(self, instance):
        request = self.context.get("request")
        # print(request.parser_context)
        rep = super().to_representation(instance)

        if request.parser_context.get("kwargs").get("pk"):
            rep.pop("absolute_url", None)
        rep["category"] = CategorySerializer(
            instance.category, context={"request": request}
        ).data

        rep["asset_type"] = AssetTypeSerializer(
            instance.asset_type, context={"request": request}
        ).data

        rep["project"] = ProjectSerializer(
            instance.project, context={"request": request}
        ).data

        return rep


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class AssetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetType
        fields = "__all__"
