from django.db import models

# Create your models here.


class Archive(models.Model):

    name = models.CharField(max_length=255)
    description = models.TextField(default="some desc")
    project = models.ForeignKey("Project", on_delete=models.CASCADE)
    asset_type = models.ForeignKey("AssetType", on_delete=models.CASCADE)
    category = models.ForeignKey("Category", on_delete=models.CASCADE)
    file = models.FileField(upload_to="files", blank=True, null=True)
    image = models.ImageField(upload_to="images", blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)
    # texture
    # rigged
    # file_type
    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]


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
