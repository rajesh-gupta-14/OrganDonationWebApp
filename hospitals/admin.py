from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin

class UserAdmin(UserAdmin):

    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('province','hospital_name','country','contact_number')}),
    )


admin.site.register(User, UserAdmin)
