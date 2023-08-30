from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status


from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response

class UploadResume(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        try:
            uploaded_file = request.FILES.get('resume')

            if uploaded_file:
                file_path = f'path/to/save/{uploaded_file.name}'

                with open(file_path, 'wb+') as destination:
                    for chunk in uploaded_file.chunks():
                        destination.write(chunk)

                return Response(
                    {'message': 'File uploaded successfully'},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'No file was uploaded'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {'error': 'Something went wrong when uploading the file, please try again.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
