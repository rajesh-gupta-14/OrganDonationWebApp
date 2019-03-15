from django.shortcuts import render, redirect
from hospitals.models import User
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required

# Create your views here.
#@login_required(login_url="donor-login")
def donor_register(request):
    
    # If method is post
    if request.POST:
        user = User()
        user.username = request.POST.get("username","")
        user.set_password(request.POST.get("password",""))
        user.email = request.POST.get("email","")
        user.first_name = request.POST.get("donor_name","")
        user.city = request.POST.get("city","")
        user.province = request.POST.get("province","")
        user.country = request.POST.get("country","")
        user.contact_number = request.POST.get("contact_number","")
        user.is_staff = False
        user.save()
        return redirect('donor-login')
    
    return render(request, "donor-registration.html")

def donor_login(request):

    # If method is post
    if request.POST:
        username = request.POST.get("username", "")
        password = request.POST.get("password", "")
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                if not user.is_staff:
                    login(request, user)
                    if "next" in request.POST:
                        return redirect(request.POST.get("next"))
                    else:
                        return render(request, "donor-registration.html")

    return render(request, "donor-login.html")