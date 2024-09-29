from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied

class CustomPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_staff:
            return True
        
        raise PermissionDenied({
            "user" : f'{request.user}',
            "details" : "you don't have permission to access output"
            })



    
