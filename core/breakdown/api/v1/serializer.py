from rest_framework import serializers
from breakdown.models import BreakDown

class BreakDownSerializer(serializers.ModelSerializer):

    class Meta:
        model = BreakDown
        fields = "__all__"