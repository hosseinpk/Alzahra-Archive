from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

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
    

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)

    class Meta:
        
        fields = ['username','password','access','refresh']
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = authenticate(username=username,password=password)
        if user is None:
            raise serializers.ValidationError({"detail":"Invalid username or password."})
        
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token


        attrs['refresh'] = str(refresh)
        attrs['access'] = str(access)
        #print(attrs)
        return super().validate(attrs)
    
    def create(self, validated_data):
        validated_data.pop("username")
        print(validated_data)
        return super().create(validated_data)

    from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    class Meta:
        fields = ['refresh']

    def validate(self, attrs):
        refresh_token = attrs.get('refresh')
        try:
            # Decode the refresh token to ensure it's valid
            RefreshToken(refresh_token)
        except Exception as e:
            raise serializers.ValidationError({"detail": "Invalid token."})
        return attrs

    def save(self, **kwargs):
        refresh_token = self.validated_data.get('refresh')
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token to effectively log out the user
        except Exception as e:
            raise serializers.ValidationError({"detail": "Error occurred while logging out."})
   


