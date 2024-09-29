from final_output.models import Output
from rest_framework import serializers

class OutputSerializer(serializers.ModelSerializer):

    class Meta:
        model = Output
        fields = '__all__'