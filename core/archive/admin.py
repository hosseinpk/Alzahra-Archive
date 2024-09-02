from django.contrib import admin
from archive.models import AssetType, Project, Archive, Category, FileType


class ArchiveAdmin(admin.ModelAdmin):
    date_hierarchy = "created_date"
    empty_value_display = "-"
    search_fields = ["name", "category", "project"]
    list_display = [
        "name",
        "added_by",
        "description",
        "asset_type",
        "category",
        "project",
        "status",
        "rigged",
        "textured",
        "file_type",
        "created_date",
    ]


# Register your models here.

admin.site.register(Archive, ArchiveAdmin)
admin.site.register(AssetType)
admin.site.register(Project)
admin.site.register(Category)
admin.site.register(FileType)
