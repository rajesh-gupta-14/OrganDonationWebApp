from django.shortcuts import render
from hospitals.models import User
from django.db.models import Q
from donors.models import DonationRequests, Appointments
import json
from django.http import JsonResponse, HttpResponse

# Create your views here.


def home(request):
    if request.POST:
        pass
    return render(request, "hospital_home.html", {'step2': 1})


def search_donations(request):
    if request.POST:
        pass
    else:
        search_keyword = request.GET.get('keyword', '')

        # Search for donations based on organ type/blood type/donor name
        donations = DonationRequests.objects.filter(Q(organ_type__iexact=search_keyword) | Q(blood_type__startswith=search_keyword) | Q(donor__first_name__iexact=search_keyword) | Q(donor__last_name__iexact=search_keyword))
        print(donations)
        # Search for donations based on donation id
        if not donations:
            if search_keyword.isdigit():
                donations = DonationRequests.objects.filter(Q(id=int(search_keyword)))

        donation_list = []
        for donation in donations:
            temp_dict = {}
            temp_dict["Donor"] = f"{donation.donor.first_name} {donation.donor.last_name}"
            temp_dict["Organ"] = donation.organ_type
            temp_dict["Donation_ID"] = donation.id
            temp_dict["Blood_Group"] = donation.blood_type
            donation_list.append(temp_dict)
        search_list = json.dumps(donation_list)
        return HttpResponse(search_list)


def approve_appointments(request):
    if request.POST:
        pass
    return render(request, "hospital-main-page.html")


def approve_donations(request):
    if request.POST:
        pass
    return render(request, "hospital-main-page.html")
