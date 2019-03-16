from django.urls import re_path

from . import views

urlpatterns = [
    re_path('register/$', views.donor_register, name='donor-register'),
    re_path('login/$', views.donor_login, name='donor-login')
]