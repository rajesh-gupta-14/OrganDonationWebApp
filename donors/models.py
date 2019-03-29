from django.db import models
from hospitals.models import User

# Create your models here.
<<<<<<< HEAD


class DonationRequests(models.Model):

    STATUS = [("Pending", "Pending"), ("Not Booked", "Not Booked"),
              ("Booked", "Booked"), ("Approved", "Approved"),
              ("Denied", "Denied")
              ]
    organ_type = models.CharField(max_length=20, blank=False, null=False)
    blood_type = models.CharField(max_length=10, blank=True, null=True)
    family_relation = models.CharField(max_length=10, blank=False, null=False)
    family_relation_name = models.CharField(max_length=10, blank=False, null=False)
=======
class DonationRequests(models.Model):

    STATUS = [  ("Pending","Pending"), ("Not Booked","Not Booked"), 
                ("Booked", "Booked"), ("Approved", "Approved"),
                ("Denied","Denied")
            ]
    organ_type = models.CharField(max_length=20, blank=False, null=False)
    blood_type = models.CharField(max_length=10, blank=True, null=True)
    family_relation = models.CharField(max_length=10, blank=False, null=False)
    family_relation_name = models.CharField(max_length = 10, blank=False, null=False)
>>>>>>> develop
    family_contact_number = models.CharField(max_length=20)
    donation_status = models.CharField(max_length=20, choices=STATUS, blank=False, null=False)
    upload_medical_doc = models.FileField(blank=True, null=True)
    donated_before = models.BooleanField(blank=False, null=False)
    family_consent = models.BooleanField(blank=False, null=False)
    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    request_datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
<<<<<<< HEAD
        return f"{self.donor}-{self.organ_type}"


class Appointments(models.Model):

    STATUS = [("Pending", "Pending"), ("Not Booked", "Not Booked"),
              ("Booked", "Booked"), ("Approved", "Approved"),
              ("Denied", "Denied")
              ]
=======
        return f"{self.donor.first_name}/{self.organ_type}"

    class Meta: 
        verbose_name_plural = "Donation Requests"
        verbose_name = "Donation Requests" 

class Appointments(models.Model):

    STATUS = [  ("Pending","Pending"), ("Not Booked","Not Booked"), 
            ("Booked", "Booked"), ("Approved", "Approved"),
            ("Denied","Denied")
        ]
>>>>>>> develop
    donation_request = models.ForeignKey(DonationRequests, on_delete=models.CASCADE)
    appointment_status = models.CharField(max_length=20, choices=STATUS, blank=False, null=False)
    hospital = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.CharField(max_length=100, blank=False, null=False)
    time = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
<<<<<<< HEAD
        return f"{self.donation_request.donor}-{self.date}"
=======
        return f"{self.donation_request}"
    
    class Meta: 
        verbose_name_plural = "Appointments"
        verbose_name = "Appointments" 

>>>>>>> develop
