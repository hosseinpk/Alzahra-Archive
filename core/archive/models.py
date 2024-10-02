from django.db import models
from accounts.models import User

# Create your models here.

# def get_file_extension(filename):
#     file,ext = filename.split('.')
#     return 'files/{}'.format(ext)


class Archive(models.Model):

    name = models.CharField(max_length=255)
    added_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    description = models.TextField()
    project = models.ForeignKey("Project", on_delete=models.CASCADE)
    asset_type = models.ForeignKey("AssetType", on_delete=models.CASCADE)
    category = models.ForeignKey("Category", on_delete=models.CASCADE)
    file = models.FileField(upload_to="archive/files", blank=True, null=True)
    image = models.ImageField(upload_to="archive/images", blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    textured = models.BooleanField(default=False)
    rigged = models.BooleanField(default=False)
    file_type = models.ForeignKey("FileType", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]

    def get_snippet(self):
        return self.description[:15] + "..."


class Project(models.Model):
    prj_name = models.CharField(max_length=100)

    def __str__(self):
        return self.prj_name


class AssetType(models.Model):
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.type


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class FileType(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name
