from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

app_name = "api_v1"

router = DefaultRouter()
router.register("archive", views.ArchiveView, basename="view")
# router.register('archive-detail',views.ArchiveDetailView,basename='detail-view')
router.register("category", views.CategoryApiView, basename="category")
router.register("asset", views.AssetTypeApiView, basename="asset")
router.register("proejct", views.ProjectApiView, basename="project")
router.register("filetype", views.FileTypeApiView, basename="filetype")


urlpatterns = []

urlpatterns += router.urls


"""urlpatterns = [
    path('archive-list/',views.ArchiveView.as_view(),name='archive'),
    path('archive-list/<int:pk>',views.ArchiveDetailView.as_view(),name='archive-detail')
]"""
