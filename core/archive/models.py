from django.db import models

# Create your models here.


class Archive(models.Model):

    name = models.CharField(max_length=255)
    project = models.ManyToManyField('Project')
    asset_type = models.OneToOneField('AssetType',on_delete=models.CASCADE)
    category = models.ManyToManyField('Category')
    file = models.FileField(blank=True,null=True)
    image = models.ImageField(upload_to='template/media',blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
    def get_project(self):
        return '\n'.join([p.prj_name for p in self.project.all()])
    

    def get_category(self):
        return '\n'.join([c.name for c in self.category.all()])
    

    ''''
    def get_asset_type(self):
        return self.asset_type
    '''
    
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




