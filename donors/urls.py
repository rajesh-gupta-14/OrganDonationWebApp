from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.register, name='donor-register'),
    path('donor_donation_request/', views.donor_donation_request, name='new-donation-request'),
    path('donation_request_list/',views.donation_request_list, name='donation_request_list'),
]