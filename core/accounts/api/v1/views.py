from rest_framework.response import Response
from rest_framework import generics,status
from .serializer import RegistrationSerializer

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