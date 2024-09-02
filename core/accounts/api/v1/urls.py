from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


app_name = "api_v1"

urlpatterns = [
    # registration
    path("registration/", views.RegistrationApiView.as_view(), name="registration"),
    # login
    path("login/", views.LoginAvpiview.as_view(), name="login"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    # login jwt
    # path('jwt/create',TokenObtainPairView.as_view(),name='jwt-create'),
    #path('jwt/refresh'),
    # path('jwt/regtrsh',TokenRefreshView.as_view(),name='token-refresh'),
    path("jwt/verify", TokenVerifyView.as_view(), name="token-verify"),
]
