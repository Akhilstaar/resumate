from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status


class UploadResume(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        try:
            data = request.data

            return Response(
                {'error': 'Working'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except:
            return Response(
                {'error': 'Something went wrong when trying to register account'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )