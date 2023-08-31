from django.urls import path
from .views import UploadResume, ViewAllData, DeleteAllData, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('upload', UploadResume.as_view(), name='upload'),
    path('viewalldata', ViewAllData.as_view(), name='viewall'),
    path('deletealldata', DeleteAllData.as_view(), name='deleteall'),
    path('register', RegisterView.as_view(), name='register'),
    path('login', TokenObtainPairView.as_view(), name='login'),
    # path('admin/listall', ListAll.as_view(), name='listall'),

]
