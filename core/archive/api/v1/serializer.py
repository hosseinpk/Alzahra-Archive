from rest_framework import serializers
from archive.models import Archive, Category, Project, AssetType , FileType
from archive.models import User


class ArchiveSerializer(serializers.ModelSerializer):
    absolute_url = serializers.SerializerMethodField()
    snippet = serializers.ReadOnlyField(source='get_snippet')

    class Meta:
        model = Archive
        fields = [
            "id",
            "name",
            "added_by",
            "description",
            "snippet",
            "status",
            "image",
            "created_date",
            "absolute_url",
            "file",
            "project",
            "asset_type",
            "category",
            "rigged",
            "textured",
            "file_type"
        ]
        read_only_fields = ['added_by']
    def get_absolute_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.pk)

    def to_representation(self, instance):
        request = self.context.get("request")
        rep = super().to_representation(instance)

        if request.parser_context.get("kwargs").get("pk"):
            rep.pop("absolute_url", None)
            rep.pop("snippet", None)
        else:
            rep.pop("description")
        rep["category"] = CategorySerializer(
            instance.category, context={"request": request}
        ).data

        rep["asset_type"] = AssetTypeSerializer(
            instance.asset_type, context={"request": request}
        ).data

        rep["project"] = ProjectSerializer(
            instance.project, context={"request": request}
        ).data

        rep["added_by"]= UserSerializer(
            instance.added_by, context={"request": request}
        ).data

        rep["file_type"] = FileTypeSerializer(
            instance.file_type, context = {"request":request}
        ).data

        return rep
    
    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["added_by"] = User.objects.get(id = request.user.id )
        return super().create(validated_data)


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

class FileTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileType
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta : 
        model = User
        fields = ["username"]