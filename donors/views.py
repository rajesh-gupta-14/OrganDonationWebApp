from django.shortcuts import render
from donors.models import Appointments, DonationRequests
from hospitals.models import User
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

# appointment request function
def appointment(request):
    # If method is post
    if request.POST:

        apmt = Appointments()
        apmt.donation_request = DonationRequests.objects.get(id=request.POST.get("dreq",""))
        apmt.hospital = User.objects.get(username=request.POST.get("hospital-name",""))
        apmt.date = request.POST.get("datetimepicker1","")
        apmt.time = request.POST.get("time","")
        apmt.appointment_status = request.POST.get("appointmentstatus", "")
        apmt.save()
        return render(request, "appointment-page.html", {"success": 1})

    donors = DonationRequests.objects.filter(donor=request.user.id)
    users = User.objects.filter(is_staff=True)

    return render(request, "appointment-page.html", {"users":users, "donors":donors})
