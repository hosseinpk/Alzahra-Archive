from django.urls import path
from . import views

app_name= 'api_v1'

urlpatterns = [
    path('test/',views.ArchiveView.as_view(),name='test')
]