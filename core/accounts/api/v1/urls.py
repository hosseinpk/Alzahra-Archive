from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from rest_framework.authtoken.views import ObtainAuthToken


app_name = "api_v1"

urlpatterns = [
    #registration
    path("registration/",views.RegistrationApiView.as_view(),name='registration'),
    #login token
    path("token/login",ObtainAuthToken.as_view(),name='token_login'),

    
    
    #login jwt
    path('jwt/create/',TokenObtainPairView.as_view(),name='jwt-create'),
    path('jwt/refresh/',TokenRefreshView.as_view(),name='jwt-refresh'),
    path('jwt/verify/',TokenVerifyView.as_view(),name='jwt-verify'),



]

