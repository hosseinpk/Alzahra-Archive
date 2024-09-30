from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from archive.models import Archive, Category, AssetType, Project, FileType
from archive.api.v1.serializer import (
    ArchiveSerializer,
    CategorySerializer,
    AssetTypeSerializer,
    ProjectSerializer,
    FileTypeSerializer,
)

from rest_framework import status, viewsets
from rest_framework.pagination import PageNumberPagination
from django.core.exceptions import ObjectDoesNotExist
from django_filters.rest_framework import DjangoFilterBackend
from .filters import CustomFilter
from .pagination import DefaultPagination
from django.db.models import Q
from rest_framework.filters import SearchFilter


class ArchiveView(viewsets.ModelViewSet):

    serializer_class = ArchiveSerializer
    queryset = Archive.objects.all()
    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_class = CustomFilter
    pagination_class = DefaultPagination
    search_fields = ['description','name']


    def get_permissions(self):
        if self.action in ["list", "retrieve", "create"]:
            permission_classes = [IsAuthenticated]

        elif self.action in ["update", "partial_update", "destroy"]:
            permission_classes = [IsAdminUser]

        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):

        queryset = self.queryset.filter(status=True).order_by("-created_date")
        category = self.request.query_params.get("category")
        project = self.request.query_params.get("project")
        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(Q(description__icontains=search) | Q(name__icontains=search) )
        if category:
            if category.isdigit():

                queryset = queryset.filter(
                    Q(category__id=category) | Q(category__name=category)
                )
            else:

                queryset = queryset.filter(category__name=category)

        if project:
            if project.isdigit():

                queryset = queryset.filter(
                    Q(project__id=project) | Q(project__prj_name=project)
                )
            else:

                queryset = queryset.filter(project__prj_name=project)

        if project and category:
            if project.isdigit() and category.isdigit():
                queryset = queryset.filter(
                    Q(project__id=project, category__id=category)
                )
            else:
                queryset = queryset.filter(
                    Q(project__prj_name=project, category__name=category)
                )

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

    def destroy(self, request, *args, **kwargs):

        obj = self.get_object()
        obj.delete()
        return Response(
            {"details": "archive method deleted succefully"},
            status=status.HTTP_204_NO_CONTENT,
        )

    def update(self, request, *args, **kwargs):

        queryset = self.get_object()
        partial = kwargs.pop("partial", False)
        serializer = self.serializer_class(
            data=request.data, instance=queryset, partial=partial
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"details": "archive method updated succefully"}, status=status.HTTP_200_OK
        )

    def partial_update(self, request, *args, **kwargs):
        kwargs["partial"] = True
        return self.update(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        try:

            queryset = self.get_object()
            serializer = self.serializer_class(queryset, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(
                {"detail": "objects doesnt exist"}, status=status.HTTP_404_NOT_FOUND
            )


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


class FileTypeApiView(viewsets.ModelViewSet):
    serializer_class = FileTypeSerializer
    permission_classes = [IsAuthenticated]
    queryset = FileType.objects.all()
