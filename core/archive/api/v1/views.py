from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from archive.models import Archive,Category,AssetType,Project
from archive.api.v1.serializer import ArchiveSerializer,CategorySerializer,AssetTypeSerializer,ProjectSerializer
from rest_framework import status,viewsets
from django.core.exceptions import ObjectDoesNotExist


class ArchiveView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ArchiveSerializer
    queryset = Archive.objects.all()

    def get_queryset(self):
        queryset = self.queryset.filter(status=True)
        return queryset
    
    def get(self,request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(instance = queryset ,many = True,context = {'request': request})
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = self.serializer_class(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
class ArchiveDetailView(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = ArchiveSerializer
    queryset = Archive.objects.filter(status=True)

    def get_queryset(self):
        queryset = self.queryset.get(id=self.kwargs['pk'])
        return queryset
    
    
    def delete(self, request, *args, **kwargs):
        obj = self.get_queryset()
        obj.delete()
        return Response({"details" : "archive method deleted succefully"},status=status.HTTP_204_NO_CONTENT)
    
    
    def update(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        partial = False
        serializer = self.serializer_class(data = request.data, instance = queryset , partial = partial  )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"details" : "archive method updated succefully"},status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request,*args,**kwargs)
    
    def get(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.serializer_class(queryset,context = {'request': request})
            return Response(serializer.data,status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'detail':'objects doesnt exist'},status=status.HTTP_404_NOT_FOUND)
        
class CategoryApiView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()


class AssetTypeApiView(viewsets.ModelViewSet):
    serializer_class = AssetTypeSerializer
    permission_classes = [IsAuthenticated]
    queryset = AssetType.objects.all()

class ProjectApiView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    

   

