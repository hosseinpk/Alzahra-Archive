from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import User
from django.contrib.auth import get_user_model

User = get_user_model()


class RegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "password1"]

    def validate(self, attrs):

        if attrs.get("password") != attrs.get("password1"):
            raise serializers.ValidationError({"detail": "password doesn't match!"})
        try:
            validate_password(attrs.get("password"))
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        return super().validate(attrs)
        

    def create(self, validated_data):
        validated_data.pop("password1")
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)

    class Meta:

        fields = ["email", "password", "access", "refresh"]

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(username=email, password=password)
        if user is None:
            raise serializers.ValidationError(
                {"detail": "Invalid username or password."}
            )

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        attrs["refresh"] = str(refresh)
        attrs["access"] = str(access)
        attrs.pop('password')
        print(attrs)
        return super().validate(attrs)






class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    class Meta:
        fields = ["refresh"]

    def validate(self, attrs):
        refresh_token = attrs.get("refresh")
        try:
            # Decode the refresh token to ensure it's valid
            RefreshToken(refresh_token)
        except Exception as e:
            raise serializers.ValidationError({"detail": "Invalid token."})
        return attrs

    def save(self, **kwargs):
        refresh_token = self.validated_data.get("refresh")
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token to effectively log out the user
        except Exception as e:
            raise serializers.ValidationError(
                {"detail": "Error occurred while logging out."}
            )
