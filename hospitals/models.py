from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    hospital_name = models.CharField(max_length=200, null=True, blank=True)
    province = models.CharField(max_length=100, null=True, blank=True)
    contact_number = models.CharField(max_length=10, blank=True, null=True)
    country = models.CharField(max_length=20, null=True)
    city = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.username