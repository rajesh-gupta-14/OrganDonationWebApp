from django.urls import re_path

from . import views

urlpatterns = [
    re_path('register/$', views.donor_register, name='donor-register'),
    re_path('login/$', views.donor_login, name='donor-login'),
    re_path('update_profile/$', views.donor_profile_update, name="donor-profile-update"),
    re_path('home/$', views.donor_home, name='donor-home'),
    re_path('forgot-password/$', views.donor_forgot_password, name='donor-forgot-password'),
    re_path('logout/$', views.donor_logout, name="donor-logout"),
    re_path('new-donation-request/$', views.new_donation_request, name='new-donation-request'),
]