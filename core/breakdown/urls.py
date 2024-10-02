from django.urls import path,include

app_name = "breakdown"

urlpatterns = [
    path("api/v1/", include("breakdown.api.v1.urls"))
]