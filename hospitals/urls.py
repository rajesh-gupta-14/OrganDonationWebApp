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
    re_path('donations-approval/', views.approve_donations, name='donations-approval')
]
