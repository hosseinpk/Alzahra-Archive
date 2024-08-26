from rest_framework import serializers
from archive.models import Archive

class ArchiveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Archive
        fields = ['id','name','status','image','project','asset_type','category']