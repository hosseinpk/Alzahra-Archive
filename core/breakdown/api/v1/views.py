from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import DefaultPagination
from rest_framework.filters import SearchFilter
from django.db.models import Q
from rest_framework.permissions import IsAdminUser

from breakdown.models import BreakDown
from .serializer import BreakDownSerializer

class BreakDownApiView(ModelViewSet):

    queryset = BreakDown.objects.all()
    serializer_class = BreakDownSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter
    ]
    pagination_class = DefaultPagination
    search_fields = ["name"]

    def get_queryset(self):
        queryset = self.queryset.filter(status=True).order_by("-created_date")

        query_params = self.request.query_params
        search_query = query_params.get("search",None)
        if search_query and self.search_fields:
            search_conditions = Q()
            for field in self.search_fields:
                search_conditions |= Q(**{f"{field}__icontains": search_query})
            queryset = queryset.filter(search_conditions)

        return queryset
    
    def get_object(self):
        obj = self.get_queryset().get(id = self.kwargs["pk"])
        return obj
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = BreakDownSerializer(instance = page, many = True , context = {"request" : request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        serializer = BreakDownSerializer(instance = queryset , many = True ,context = {"request" : request} )
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        try:
            queryset = self.get_object()
            serializer = BreakDownSerializer(instance = queryset,context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(
                {"detail": "objects doesn't exist"}, status=status.HTTP_404_NOT_FOUND
            )
    def create(self, request, *args, **kwargs):
        serializer = BreakDownSerializer(data = request.data ,context={"request": request} )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def destroy(self, request, *args, **kwargs):
        return Response({"details":"can not delete"},status=status.HTTP_403_FORBIDDEN)
    def update(self, request, *args, **kwargs):
        return Response({"details":"can not update"},status=status.HTTP_403_FORBIDDEN)
    def partial_update(self, request, *args, **kwargs):
        return Response({"details":"can not update"},status=status.HTTP_403_FORBIDDEN)