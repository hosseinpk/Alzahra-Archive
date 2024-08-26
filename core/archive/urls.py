from django.urls import path,include
from archive.views import *

app_name = "archive"

urlpatterns = [
    path('api/v1/',include('archive.api.v1.urls'))
]