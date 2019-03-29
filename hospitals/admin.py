from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin

<<<<<<< HEAD
# Register your models here.
from hospitals.models import User

admin.site.register(User)
=======
class UserAdmin(UserAdmin):

    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('province','hospital_name','country','contact_number')}),
    )


admin.site.register(User, UserAdmin)
>>>>>>> develop
