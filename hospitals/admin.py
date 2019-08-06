from django.contrib import admin
class UserAdmin(UserAdmin):

    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('province','hospital_name','country','contact_number')}),
    )


admin.site.register(User, UserAdmin)