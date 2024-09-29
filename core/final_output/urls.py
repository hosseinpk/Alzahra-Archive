from django.urls import path, include


app_name = "final-output"

urlpatterns = [
    path("api/v1/", include("final_output.api.v1.urls"))
    ]