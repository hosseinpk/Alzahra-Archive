# tasks.py
from celery import shared_task
from django.core.files.base import ContentFile
from .models import Archive
import os

@shared_task
def save_file_in_background(id, file_path):
    try:
        archive = Archive.objects.get(pk=id)
        with open(file_path, 'rb') as file:
            archive.file.save(file_path.split('/')[-1], ContentFile(file.read()))
        archive.save()
        print("File saved successfully.")
    
    except Archive.DoesNotExist:
        print("Archive with given ID does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        
        if os.path.exists(file_path):
            os.remove(file_path)

