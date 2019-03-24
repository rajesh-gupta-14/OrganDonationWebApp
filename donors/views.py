from django.shortcuts import render

# Create your views here.
def register(request):
    
    # If method is post
    if request.POST:
        pass
    
    return render(request, "hospital-registration.html")

def login(request):

    # If method is post
    if request.POST:
        pass

    return render(request, "hospital-login.html")

def donor_donation_request(request):
    # If method is post
    if request.POST:
        newdonationrequest = DonationRequests()
        newdonationrequest.donation_request = request.POST.get("newdonationreq","")
        newdonationrequest.organ_type = request.POST.get("organ_type","")
        newdonationrequest.blood_type = request.POST.get("blood_type","")
        newdonationrequest.family_relation = request.POST.get("family_relation","")
        newdonationrequest.family_relation_name = request.POST.get("family_relation_name","")
        newdonationrequest.family_contact_number = request.POST.get("family_contact_number ","")
        newdonationrequest.donation_status = request.POST.get("donation_status","")
        newdonationrequest.family_consent = request.POST.get("family_consent","")
        
        newdonationrequest.save()
    return render(request, "new-donation-request.html")

def donation_request_list(request):
    if request.POST:
        pass
    else:
        donation_id = request.GET.get('donation_id', '')
        print('donation id', donation_id)
        donations = DonationRequests.objects.filter(Q(id=int(donation_id)))
        donation_list = []
        for donation in donations:
            donaltion_req_list = {}
            donaltion_req_list["donation_id"] = donation.id
            donaltion_req_list["first_name"] = donation.donor.first_name
            donaltion_req_list["organ"] = donation.organ_type
            donation_list.append(donaltion_req_list)
        donation_details = json.dumps(donation_request_list)
        return HttpResponse(donor_donation_request_list)
