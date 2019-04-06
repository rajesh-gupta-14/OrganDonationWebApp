from django.urls import re_path

from . import views

urlpatterns = [
    re_path('home/$', views.home, name='home'),
    re_path('search-donations/', views.search_donations, name='search-donations'),
    re_path('search-donation-details/', views.search_donation_details, name='search-donation-details'),
    re_path('fetch-appointments/', views.fetch_appointments, name='fetch-appointments'),
    re_path('fetch-appointment-details/', views.fetch_appointment_details, name='fetch-appointment-details'),
    re_path('fetch-donations/', views.fetch_donations, name='fetch-donations'),
    re_path('fetch-donation-details/', views.fetch_donation_details, name='fetch-donation-details'),
    re_path('appointments-approval/', views.approve_appointments, name='appointments-approval'),
    re_path('donations-approval/', views.approve_donations, name='donations-approval'),
    re_path('fetch-counts/', views.fetch_counts, name='fetch-counts'),
    re_path('register/$', views.hospital_register, name='hospital-register'),
    re_path('login/$', views.hospital_login, name='hospital-login'),
    re_path('forgot-password/$', views.hospital_forgot_password, name='hospital-forgot-password'),
    re_path('view-pdf/(?P<donor_id>\d+)/$', views.form_to_PDF, name="form-to-pdf"),
    re_path('get-user-details/', views.get_user_details, name='get-user-details'),
    re_path('update-user-details/', views.update_user_details, name='update-user-details'),
    re_path('update-pwd-details/', views.update_pwd_details, name='update-pwd-details'),
    re_path('hospital-logout/$', views.hospital_login, name='hospital-logout'),
    re_path('email-donor/(?P<donor_id>\d+)/$', views.email_donor, name='email-donor'),
]
