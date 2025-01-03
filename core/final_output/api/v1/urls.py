from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

app_name = "api_v1"

router = DefaultRouter()
router.register("output", views.OutputApiView, basename="output")


urlpatterns = []

urlpatterns += router.urls
