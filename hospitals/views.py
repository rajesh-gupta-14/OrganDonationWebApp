from django.shortcuts import render, redirect
from .models import User
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
import smtplib, getpass
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import COMMASPACE, formatdate
from email import encoders
import string, secrets, ast, random
from donors.models import DonationRequests, Appointments
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
from django.template.loader import render_to_string
from io import StringIO, BytesIO
from xhtml2pdf import pisa
from PyPDF2 import PdfFileMerger, PdfFileReader

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
                    msg = """Logged in successfully. The homepage is with the other developer who is working on it. But,
                        the remaining functionality works the exact same way it does on donor side. Hence, you 
                        are being redirected to same login page."""
                    login(request, user)
                    success=1 #remove
                    return render(request, "hospital-login.html", {"success":success, "msg":msg}) #redirect(request.POST.get("next", "hospital-register"))
        else:
            msg="Invalid password"
            success=1
            return render(request, "hospital-login.html", {"success":success, "msg":msg})

    return render(request, "hospital-login.html")


def send_mail(send_from, send_to, subject, body_of_msg, files=[],
              server="localhost", port=587, username='', password='',
              use_tls=True):
		message = MIMEMultipart()
		message['From'] = send_from
		message['To'] = send_to
		message['Date'] = formatdate(localtime=True)
		message['Subject'] = subject
		message.attach(MIMEText(body_of_msg))
		smtp = smtplib.SMTP(server, port)
		if use_tls:
			smtp.starttls()
		smtp.login(username, password)
		smtp.sendmail(send_from, send_to, message.as_string())
		smtp.quit()



def hospital_forgot_password(request):
    success = 0
    if request.POST:
        username = request.POST.get("username", "")
        try:
            user = User.objects.get(username=username)
            email = user.email
            password = random.randint(1000000, 999999999999)
            user.set_password(password)
            user.save()
            send_mail("foodatdalteam@gmail.com", email, "Password reset for your organ donation account",
                        """Your request to change password has been processed.\nThis is your new password: {}\n
                            If you wish to change password, please go to your user profile and change it.""".format(password),
                            server="smtp.gmail.com",username="foodatdalteam@gmail.com",password="foodatdal")
            success = 1
            msg = "Success. Check your registered email for new password!"
            return render(request, "hospital-forgot-password.html", {"success":success, "msg":msg})
        except:
            success = 1
            msg = "User does not exist!"
            return render(request, "hospital-forgot-password.html", {"success":success, "msg":msg})

    return render(request, "hospital-forgot-password.html", {"success":success})

def form_to_PDF(request, donor_id=1):
    user = User.objects.get(username="vivek") #change condition
    donation_request = DonationRequests.objects.get(donor=user)
    html_string = render_to_string('user-details.html', {'user': user})
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="report.pdf"'
    result = BytesIO()
    pisa.CreatePDF(html_string, result)
    userpdf=PdfFileReader(result)
    usermedicaldoc=donation_request.upload_medical_doc.read()
    usermedbytes=BytesIO(usermedicaldoc)
    usermedicalpdf=PdfFileReader(usermedbytes)
    merger = PdfFileMerger()
    merger.append(userpdf)
    merger.append(usermedicalpdf)
    merger.write(response)
    return response