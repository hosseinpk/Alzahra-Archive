from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions


class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','email','password','confirm_password']

    def validate(self, attrs):
        if User.objects.filter(email = attrs.get('email')).exists():
            raise serializers.ValidationError({"detail" : "email already exist!"})

        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError({"detail" : "password doesnt match!"})
        try:
            validate_password(attrs.get('password'))
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({'password':list(e.messages)})
        return super().validate(attrs)
    
    def create(self, validated_data):
        validated_data.pop('password')
        validated_data.pop('confirm_password')
        return super().create(validated_data)
    


