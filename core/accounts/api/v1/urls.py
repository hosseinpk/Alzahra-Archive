from django.urls import path,include
from . import views


app_name = "api_v1"

urlpatterns = [
    #registration
    path("registration/",views.RegistrationApiView.as_view(),name='login'),
    #login
    #path("login/",views.LoginApiView.as_view(),name='login')
    #login jwt

]

