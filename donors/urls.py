from django.urls import path

from . import views

#urls to bind models to view
urlpatterns = [
    path('register/', views.register, name='donor-register'),
    path('appointments/', views.appointment, name='donor-appointment'),

]