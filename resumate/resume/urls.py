from django.urls import path
from .views import UploadResume, ViewAllData, DeleteAllData

urlpatterns = [
    path('upload', UploadResume.as_view(), name='upload'),
    path('viewalldata', ViewAllData.as_view(), name='viewall'),
    path('deletealldata', DeleteAllData.as_view(), name='deleteall'),

]
