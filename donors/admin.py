from django.contrib import admin

from donors.models import DonationRequests, Appointments

# Register your models here.
admin.site.register(DonationRequests)
admin.site.register(Appointments)