from django.urls import re_path

from . import views

urlpatterns = [
    re_path('register/$', views.hospital_register, name='hospital-register'),
    re_path('login/$', views.hospital_login, name='hospital-login'),
    re_path('forgot-password/$', views.hospital_forgot_password, name='hospital-forgot-password'),
    re_path('view-pdf/(?P<donor_id>\d+)/$', views.form_to_PDF, name="form-to-pdf"),
]