from django.db import models

# Create your models here.


class BreakDown(models.Model):

    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="breakdown/images",blank=True,null=True)
    file = models.FileField(upload_to="breakdown/files",blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)

    def __str__(self):

        return self.name