from django.urls import re_path

from . import views

urlpatterns = [
    re_path('home/$', views.home, name='home'),
    re_path('search-donations/', views.search_donations, name='search-donations'),
    re_path('search-donation-details/', views.search_donation_details, name='search-donation-details'),
    re_path('appointments-approval/', views.approve_appointments, name='appointments-approval'),
    re_path('donations-approval/', views.approve_donations, name='donations-approval')
]
