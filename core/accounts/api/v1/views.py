from rest_framework.response import Response
from rest_framework import generics, status
from .serializer import RegistrationSerializer, LoginSerializer, LogoutSerializer
from rest_framework.permissions import IsAuthenticated


class RegistrationApiView(generics.GenericAPIView):
    serializer_class = RegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = {"email": serializer.validated_data["email"]}
            return Response(data=data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginApiView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            data = {
                "access": serializer.validated_data["access"],
                "refresh": serializer.validated_data["refresh"],
            }

            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutApiView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = LogoutSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            data = {"detail": "Successfully logged out."}
            return Response(
                data=data,
                status=status.HTTP_204_NO_CONTENT,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
