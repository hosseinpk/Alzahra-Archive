from django.urls import path
from . import views

app_name= 'api_v1'

urlpatterns = [
    path('archive-list/',views.ArchiveView.as_view(),name='archive'),
    path('archive-list/<int:pk>',views.ArchiveDetailView.as_view(),name='archive-detail')
]