import uuid

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, serializers

from .models import ResumeData

import PyPDF2


class ResumeDataSerializer(serializers.Serializer):
    uuid = serializers.CharField()
    data = serializers.CharField()


class UploadResume(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        try:
            uploaded_file = request.FILES.get('resume')

            if uploaded_file:
                if not uploaded_file.name.lower().endswith('.pdf'):
                    return Response(
                        {'error': 'Uploaded file must be a PDF'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                filename = uuid.uuid4().hex
                unique_filename = f'./files/resume/{filename}.pdf'
                file_path = unique_filename
                with open(file_path, 'wb+') as destination:
                    for chunk in uploaded_file.chunks():
                        destination.write(chunk)

                with open(file_path, "rb") as pdf_file:
                    pdf_reader = PyPDF2.PdfReader(pdf_file)
                    res_data = pdf_reader.pages[0].extract_text()

                userdata = ResumeData(uuid=filename, data=res_data)
                userdata.save()

                return Response(
                    {'message': filename},
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


class ViewAllData(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        try:
            data = ResumeData.objects.all()
            serializer = ResumeDataSerializer(data, many=True)

            return Response(
                {"data": serializer.data},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class DeleteAllData(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        try:
            num_deleted, _ = ResumeData.objects.all().delete()

            return Response(
                {"message": f"{num_deleted} records deleted"},
                status=status.HTTP_204_NO_CONTENT
            )

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
