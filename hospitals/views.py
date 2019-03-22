from django.shortcuts import render
from hospitals.models import User
from django.db.models import Q
from donors.models import DonationRequests, Appointments
import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404

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
        donation_id_from_UI = request.GET.get('donation_id', '')
        donations = Appointments.objects.filter(Q(donation_request__id=int(donation_id_from_UI)))
        donation_list = []
        for donation in donations:
            temp_dict = {}
            # Donor details
            temp_dict["user_name"] = donation.donation_request.donor.username
            temp_dict["first_name"] = donation.donation_request.donor.first_name
            temp_dict["last_name"] = donation.donation_request.donor.last_name
            temp_dict["email"] = donation.donation_request.donor.email
            temp_dict["contact_number"] = donation.donation_request.donor.contact_number
            temp_dict["city"] = donation.donation_request.donor.city
            temp_dict["country"] = donation.donation_request.donor.country
            temp_dict["province"] = donation.donation_request.donor.province
            # Donation details
            temp_dict["organ"] = donation.donation_request.organ_type
            temp_dict["donation_id"] = donation.donation_request.id
            temp_dict["blood_group"] = donation.donation_request.blood_type
            temp_dict["donation_status"] = donation.donation_request.donation_status
            temp_dict["approved_by"] = donation.hospital.hospital_name
            temp_dict["family_member_name"] = donation.donation_request.family_relation_name
            temp_dict["family_member_relation"] = donation.donation_request.family_relation
            temp_dict["family_member_contact"] = donation.donation_request.family_contact_number
            donation_list.append(temp_dict)
        donation_details = json.dumps(donation_list)
        return HttpResponse(donation_details)


def fetch_appointments(request):
    if request.POST:
        pass
    else:
        # Fetching appointment details
        status = "Pending"
        appointments = Appointments.objects.filter(Q(hospital__hospital_name__iexact="IWK Health Centre") & Q(appointment_status__iexact=status))
        appointment_list = []
        for appointment in appointments:
            temp_dict = {}
            temp_dict["first_name"] = appointment.donation_request.donor.first_name
            temp_dict["last_name"] = appointment.donation_request.donor.last_name
            # Donation details
            temp_dict["organ"] = appointment.donation_request.organ_type
            temp_dict["donation_id"] = appointment.donation_request.id
            temp_dict["blood_group"] = appointment.donation_request.blood_type
            # Appointment details
            temp_dict["appointment_id"] = appointment.id
            temp_dict["date"] = appointment.date
            temp_dict["time"] = appointment.time
            temp_dict["appointment_status"] = appointment.appointment_status
            appointment_list.append(temp_dict)
        appointment_details = json.dumps(appointment_list)
        return HttpResponse(appointment_details)


def fetch_donations(request):
    if request.POST:
        pass
    else:
        donation_status = "Pending"
        appointment_status = "Approved"
        appointments = Appointments.objects.filter(Q(hospital__hospital_name__iexact="IWK Health Centre") & Q(appointment_status__iexact=appointment_status) & Q(donation_request__donation_status__iexact=donation_status))
        appointment_list = []
        for appointment in appointments:
            temp_dict = {}
            temp_dict["first_name"] = appointment.donation_request.donor.first_name
            temp_dict["last_name"] = appointment.donation_request.donor.last_name
            # Donation details
            temp_dict["organ"] = appointment.donation_request.organ_type
            temp_dict["donation_id"] = appointment.donation_request.id
            temp_dict["blood_group"] = appointment.donation_request.blood_type
            # Appointment details
            temp_dict["appointment_id"] = appointment.id
            temp_dict["date"] = appointment.date
            temp_dict["time"] = appointment.time
            temp_dict["appointment_status"] = appointment.appointment_status
            appointment_list.append(temp_dict)
        appointment_details = json.dumps(appointment_list)

        return HttpResponse(appointment_details)


def fetch_appointment_details(request):
    if request.POST:
        pass
    else:
        # Fetching appointment details
        appointment_id_from_UI = request.GET.get('appointment_id', '')
        print('appointment id', appointment_id_from_UI)
        appointments = Appointments.objects.filter(Q(id=int(appointment_id_from_UI)))
        appointment_list = []
        for appointment in appointments:
            # Donor details
            temp_dict = {}
            temp_dict["first_name"] = appointment.donation_request.donor.first_name
            temp_dict["last_name"] = appointment.donation_request.donor.last_name
            temp_dict["email"] = appointment.donation_request.donor.email
            temp_dict["contact_number"] = appointment.donation_request.donor.contact_number
            temp_dict["city"] = appointment.donation_request.donor.city
            temp_dict["country"] = appointment.donation_request.donor.country
            temp_dict["province"] = appointment.donation_request.donor.province
            # Donation details
            temp_dict["organ"] = appointment.donation_request.organ_type
            temp_dict["donation_id"] = appointment.donation_request.id
            temp_dict["blood_group"] = appointment.donation_request.blood_type
            temp_dict["donation_status"] = appointment.donation_request.donation_status
            temp_dict["family_member_name"] = appointment.donation_request.family_relation_name
            temp_dict["family_member_relation"] = appointment.donation_request.family_relation
            temp_dict["family_member_contact"] = appointment.donation_request.family_contact_number
            # Appointment details
            temp_dict["appointment_id"] = appointment.id
            temp_dict["date"] = appointment.date
            temp_dict["time"] = appointment.time
            temp_dict["appointment_status"] = appointment.appointment_status
            appointment_list.append(temp_dict)
        appointment_details = json.dumps(appointment_list)
        return HttpResponse(appointment_details)


def fetch_donation_details(request):
    if request.POST:
        pass
    else:
        # Fetching donation details
        donation_id_from_UI = request.GET.get('donation_id', '')
        print('donation id', donation_id_from_UI)
        donations = DonationRequests.objects.filter(Q(id=int(donation_id_from_UI)))
        donation_list = []
        for donation in donations:
            # Donor details
            temp_dict = {}
            temp_dict["first_name"] = donation.donor.first_name
            temp_dict["last_name"] = donation.donor.last_name
            temp_dict["email"] = donation.donor.email
            temp_dict["contact_number"] = donation.donor.contact_number
            temp_dict["city"] = donation.donor.city
            temp_dict["country"] = donation.donor.country
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


@csrf_exempt
def approve_appointments(request):
    if request.POST:
        appointment_id_from_UI = request.POST.get('ID', '')
        actionToPerform = request.POST.get('action', '')
        print('appointment id', appointment_id_from_UI)
        print('actionToPerform', actionToPerform)
        appointments = get_object_or_404(Appointments, id=appointment_id_from_UI)
        appointments.appointment_status = actionToPerform
        appointments.save(update_fields=["appointment_status"])
    return HttpResponse("success")


@csrf_exempt
def approve_donations(request):
    if request.POST:
        donation_id_from_UI = request.POST.get('ID', '')
        actionToPerform = request.POST.get('action', '')
        print('donation id', donation_id_from_UI)
        print('actionToPerform', actionToPerform)
        donation = get_object_or_404(DonationRequests, id=donation_id_from_UI)
        donation.donation_status = actionToPerform
        donation.save(update_fields=["donation_status"])
    return HttpResponse("success")


def fetch_counts(request):
    if request.POST:
        pass
    else:
        appointment_count = Appointments.objects.filter(Q(hospital__hospital_name__iexact="IWK Health Centre") & Q(appointment_status__iexact="Pending")).count()
        print("appointment count", appointment_count)
        donation_status = "Pending"
        appointment_status = "Approved"
        donation_count = Appointments.objects.filter(Q(hospital__hospital_name__iexact="IWK Health Centre") & Q(appointment_status__iexact=appointment_status) & Q(donation_request__donation_status__iexact=donation_status)).count()
        print("donation count", donation_count)
        dummy_list = []
        temp_dict = {}
        temp_dict["appointment_count"] = appointment_count
        temp_dict["donation_count"] = donation_count
        dummy_list.append(temp_dict)
        count_json = json.dumps(dummy_list)
        return HttpResponse(count_json)
