from django.db import models
from hospitals.models import User

# Donation request model
class DonationRequests(models.Model):

    STATUS = [  ("Pending","Pending"), ("Not Booked","Not Booked"), 
                ("Booked", "Booked"), ("Approved", "Approved"),
                ("Denied","Denied")
            ]
    organ_type = models.CharField(max_length=20, blank=False, null=False)
    blood_type = models.CharField(max_length=10, blank=True, null=True)
    family_relation = models.CharField(max_length=10, blank=False, null=False)
    family_relation_name = models.CharField(max_length = 10, blank=False, null=False)
    family_contact_number = models.CharField(max_length=20)
    donation_status = models.CharField(max_length=20, choices=STATUS, blank=False, null=False)
    upload_medical_doc = models.FileField(blank=True, null=True)
    donated_before = models.BooleanField(blank=False, null=False)
    family_consent = models.BooleanField(blank=False, null=False)
    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    request_datetime = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.donation_status

# Appointment model
class Appointments(models.Model):

    STATUS = [("Pending","Pending"), ("Not Booked","Not Booked"),
                ("Booked", "Booked"), ("Approved", "Approved"),
                ("Denied","Denied")]

    donation_request = models.ForeignKey(DonationRequests, on_delete=models.CASCADE)
    hospital = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.CharField(max_length=100, blank=False, null=False)
    time = models.CharField(max_length=100, blank=False, null=False)
    appointment_status = models.CharField(max_length=20, choices=STATUS, blank=False, null=False)

    def __str__(self):
        return self.date
