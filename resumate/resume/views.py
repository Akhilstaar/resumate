import uuid
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, serializers
from .parse_resume import *
from .models import ResumeData
import PyPDF2
from .supermodel import * 

class ResumeDataSerializer(serializers.Serializer):
    data = serializers.JSONField()


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

                # resp = generate_prompt(filename, file_path)
                # parse_resume(filename, file_path)

                # print(res_data)
                # with open(file_path, "rb") as pdf_file:
                #     pdf_reader = PyPDF2.PdfReader(pdf_file)
                #     res_data = pdf_reader.pages[0].extract_text()

                # print(resp)

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
            resume_data_list = [] 
            all_resume_data = ResumeData.objects.all()

            for resume_data in all_resume_data:
                # print(resume_data.data)
                resume_data_list.append({
                    'uuid': resume_data.uuid,
                    'json_string': json.loads(resume_data.data)
                })

            response_data = {'resume_data_list': resume_data_list}
            return Response(
                response_data,
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
