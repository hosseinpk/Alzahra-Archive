from rest_framework.response import Response
from rest_framework import generics,status
from .serializer import RegistrationSerializer,LoginSerializer,LogoutSerializer

class RegistrationApiView(generics.GenericAPIView):
    serializer_class = RegistrationSerializer
    def post(self,request,*args,**kwargs):
        serializer = RegistrationSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            data = {
                'username' : serializer.validated_data['username'],
                'email' : serializer.validated_data['email']
            }
            return Response(data=data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class LoginAvpiview(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self,request,*args,**kwargs):
        serializer = LoginSerializer(data = request.data,context = {'request':request})
        if serializer.is_valid():
            data = {
                'access' : serializer.validated_data['access'],
                'refresh' : serializer.validated_data['refresh']
            }
            
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LogoutView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    def post(self, request, *args, **kwargs):
        serializer = LogoutSerializer(data=request.data,context = {'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)