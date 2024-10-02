from django.contrib import admin
from breakdown.models import BreakDown 


class BreakDownAdmin(admin.ModelAdmin):
    search_fields = [
        "name",
        
    ]
    list_display = [
        "name",
        "status",
        "image",
        "file",
        "created_date",
        "updated_date",
    ]
    empty_value_display = "-"


# Register your models here.


admin.site.register(BreakDown, BreakDownAdmin)
