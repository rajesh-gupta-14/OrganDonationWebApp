from django.shortcuts import render
from donors.models import Appointments

# Create your views here.
def register(request):
    
    # If method is post
    if request.POST:
        pass
    
    return render(request, "donor-registration.html")

def login(request):

    # If method is post
    if request.POST:
        pass

    return render(request, "hospital-login.html")

def appointment(request):
    # If method is post
    if request.POST:

        apmt = Appointments()
        apmt.donation_request = request.POST.get("dreq","")
        apmt.hospital = request.POST.get("hospital-name","")
        apmt.date = request.POST.get("datetimepicker1","")
        apmt.time = request.POST.get("time","")
        apmt.appointment_status = request.POST.get("appointmentstatus", "")
        apmt.save()

    return render(request, "appointment-page.html")
