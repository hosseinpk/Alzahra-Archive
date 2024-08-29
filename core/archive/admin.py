from django.contrib import admin
from archive.models import AssetType, Project, Archive, Category


class ArchiveAdmin(admin.ModelAdmin):
    date_hierarchy = "created_date"
    empty_value_display = "-"
    search_fields = ["name", "category", "project"]
    list_display = [
        "name",
        "description",
        "asset_type",
        "category",
        "project",
        "status",
        "created_date",
    ]


# Register your models here.

admin.site.register(Archive, ArchiveAdmin)
admin.site.register(AssetType)
admin.site.register(Project)
admin.site.register(Category)
