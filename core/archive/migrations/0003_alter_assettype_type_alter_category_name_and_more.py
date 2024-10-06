# Generated by Django 4.2 on 2024-10-06 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("archive", "0002_alter_archive_file_alter_archive_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="assettype",
            name="type",
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name="category",
            name="name",
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name="filetype",
            name="name",
            field=models.CharField(max_length=20, unique=True),
        ),
        migrations.AlterField(
            model_name="project",
            name="prj_name",
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
