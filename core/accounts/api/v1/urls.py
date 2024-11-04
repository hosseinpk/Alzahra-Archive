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
    path(
        "changepassword/", views.ChangePasswordApiView.as_view(), name="changepassword"
    ),
    # login
    path("login/", views.LoginApiView.as_view(), name="login"),
    path("logout/", views.LogoutApiView.as_view(), name="logout"),
    path('refresh',TokenRefreshView.as_view(),name='token-refresh'),
    path("verify", TokenVerifyView.as_view(), name="token-verify"),
]
