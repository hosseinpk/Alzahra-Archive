from django.urls import path
from . import views 
from rest_framework.routers import DefaultRouter

app_name = "api_v1"

router = DefaultRouter()
router.register("breakdown",views.BreakDownApiView,basename="breakdown")

urlpatterns = []

urlpatterns += router.urls