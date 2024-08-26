from rest_framework.response import Response
from rest_framework.views import APIView

class ArchiveView(APIView):
    def get(self,request):
        return Response({"details":"ok"})