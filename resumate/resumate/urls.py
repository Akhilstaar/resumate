from django.contrib import admin
from django.urls import path
from .views import UploadResume

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/upload', UploadResume.as_view(), name='upload'),
]
