from django.contrib import admin
from .models import DonationRequests, Appointments
# Register your models here.

admin.site.register(DonationRequests)
admin.site.register(Appointments)
