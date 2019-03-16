from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.register, name='hospital-register'),
    path('login/', views.login, name='hospital-login')
]