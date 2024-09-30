from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from final_output.models import Output
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from .serializers import OutputSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import DefaultPagination
from .filters import CustomFilter
from .permissions import CustomPermission
from rest_framework.filters import SearchFilter
from django.db.models import Q



class OutputApiView(ModelViewSet):

    serializer_class = OutputSerializer
    permission_classes = [
        
        CustomPermission,
    ]
    filter_backends = [DjangoFilterBackend,SearchFilter]
    pagination_class = DefaultPagination
    filterset_class = CustomFilter
    queryset = Output.objects.all()
    search_fields = ['released_year','name']
    filter_fields = ['released_year']
    

    # def get_queryset(self):
    #     queryset = Output.objects.all().filter(status=True).order_by("-created_date")
    #     search = self.request.query_params.get("search")
    #     year = self.request.query_params.get("released_year")
    #     if search:
    #         queryset = queryset.filter(Q(released_year__icontains=search) | Q(name__icontains=search) )
        
    #     if year :
    #         queryset = queryset.filter(released_year__icontains = year) 

    #     return queryset
    
    def get_queryset(self):
        
        print(self.request.query_params)
        queryset = Output.objects.all().filter(status=True).order_by("-created_date")

        
        query_params = self.request.query_params
        
        
        filters = {f'{key}__icontains': query_params[key] for key in self.filter_fields if key in query_params}
        
        if filters:
            queryset = queryset.filter(**filters)

        
        search_query = query_params.get('search', None)
        if search_query and self.search_fields:
            search_conditions = Q()
            for field in self.search_fields:
                search_conditions |= Q(**{f"{field}__icontains": search_query})
            queryset = queryset.filter(search_conditions)

        return queryset

    def get_object(self):
        obj = self.get_queryset().get(id=self.kwargs["pk"])
        return obj

    def list(self, request):

        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.serializer_class(
                instance=page, many=True, context={"request": request}
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        serializer = self.serializer_class(
            instance=queryset, many=True, context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):

        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        try:
            queryset = self.get_object()
            serializer = self.serializer_class(queryset, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response(
                {"detail": "objects doesnt exist"}, status=status.HTTP_404_NOT_FOUND
            )
