from django.urls import re_path

from . import views

urlpatterns = [
    re_path('register/$', views.hospital_register, name='hospital-register'),
    re_path('login/$', views.hospital_login, name='hospital-login')
]