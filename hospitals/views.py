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
        status = "Approved"
        # Search for donations based on organ type/blood type/donor name
        donations = DonationRequests.objects.filter((Q(organ_type__iexact=search_keyword) | Q(blood_type__startswith=search_keyword) | Q(donor__first_name__iexact=search_keyword) | Q(donor__last_name__iexact=search_keyword)) & Q(donation_status__iexact=status))
        print(donations)
        # Search for donations based on donation id
        if not donations:
            if search_keyword.isdigit():
                donations = DonationRequests.objects.filter(Q(id=int(search_keyword)) & Q(donation_status__iexact=status))

        donation_list = []
        for donation in donations:
            print(donation.donation_status)
            temp_dict = {}
            temp_dict["donor"] = f"{donation.donor.first_name} {donation.donor.last_name}"
            temp_dict["organ"] = donation.organ_type
            temp_dict["donation_id"] = donation.id
            temp_dict["blood_group"] = donation.blood_type
            donation_list.append(temp_dict)
        search_list = json.dumps(donation_list)
        return HttpResponse(search_list)


def search_donation_details(request):
    if request.POST:
        pass
    else:
        # Fetching donation details
        donations = DonationRequests.objects.filter(Q(id=int(1)))
        for donation in donations:
            user_name = donation.donor.username
            temp_dict = {}
            donation_list = []
            # Donor details
            temp_dict["user_name"] = donation.donor.username
            temp_dict["first_name"] = donation.donor.first_name
            temp_dict["last_name"] = donation.donor.last_name
            temp_dict["email"] = donation.donor.email
            temp_dict["contact_number"] = donation.donor.contact_number
            temp_dict["city"] = donation.donor.city
            temp_dict["country"] = donation.donor.city
            temp_dict["province"] = donation.donor.province
            # Donation details
            temp_dict["organ"] = donation.organ_type
            temp_dict["donation_id"] = donation.id
            temp_dict["blood_group"] = donation.blood_type
            temp_dict["donation_status"] = donation.donation_status
            temp_dict["family_member_name"] = donation.family_relation_name
            temp_dict["family_member_relation"] = donation.family_relation
            temp_dict["family_member_contact"] = donation.family_contact_number

        donation_list.append(temp_dict)
        donation_details = json.dumps(donation_list)
    return HttpResponse(donation_details)


def approve_appointments(request):
    if request.POST:
        pass
    return render(request, "hospital-main-page.html")


def approve_donations(request):
    if request.POST:
        pass
    return render(request, "hospital-main-page.html")
