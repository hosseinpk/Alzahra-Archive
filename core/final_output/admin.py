from django.contrib import admin
from final_output.models import Output


class OutputAdmin(admin.ModelAdmin):
    search_fields = [
        "name",
        "released_year",
    ]
    list_display = [
        "name",
        "released_year",
        "status",
        "image",
        "file",
        "created_date",
        "updated_date",
    ]
    empty_value_display = "-"


# Register your models here.


admin.site.register(Output, OutputAdmin)
