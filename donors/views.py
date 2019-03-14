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