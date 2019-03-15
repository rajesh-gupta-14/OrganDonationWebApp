from django.shortcuts import render, redirect
from .models import User
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required

# Create your views here.

def hospital_register(request):
    
    # If method is post
    if request.POST:
        user = User()
        user.username = request.POST.get("username","")
        user.set_password(request.POST.get("password",""))
        user.email = request.POST.get("email","")
        user.first_name = request.POST.get("hospital_name","")
        user.city = request.POST.get("city","")
        user.province = request.POST.get("province","")
        user.country = request.POST.get("country","")
        user.contact_number = request.POST.get("contact_number","")
        user.is_staff = True
        user.save()
        return redirect('hospital-login')
    
    return render(request, "hospital-registration.html")

def hospital_login(request):

    # If method is post
    if request.POST:
        username = request.POST.get("username", "")
        password = request.POST.get("password", "")
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                if user.is_staff:
                    login(request, user)
                    if "next" in request.POST:
                        return redirect(request.POST.get("next"))
                    else:
                        return render(request, "hospital-registration.html")

    return render(request, "hospital-login.html")