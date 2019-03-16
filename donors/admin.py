from django.contrib import admin

# Register your models here.
from donors.models import DonationRequests, Appointments

admin.site.register(DonationRequests)
admin.site.register(Appointments)
