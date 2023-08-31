import uuid
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import UserAccount
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, serializers
from .parse_resume import *
from .models import ResumeData
import PyPDF2
from .supermodel import * 
from datetime import date, timedelta

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


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=20)
    email = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)
    cpassword = serializers.CharField(max_length=50)


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            prediction_data = serializer.validated_data

            username = prediction_data['username']
            email = prediction_data['email']
            password = prediction_data['password']
            cpassword = prediction_data['cpassword']

            if password == cpassword:
                if len(password) >= 8:
                    if not User.objects.filter(username=username).exists():
                        if not User.objects.filter(email=email).exists():
                            new_user = User.objects.create_user(
                                username=username,
                                email=email,
                                password=password,
                            )
                            user_initials = UserAccount(user=new_user)
                            user_initials.save()
                            new_user.save()

                            if User.objects.filter(username=username).exists():
                                return Response(
                                    {'success': 'Account created successfully'},
                                    status=status.HTTP_201_CREATED
                                )
                            else:
                                return Response(
                                    {'error': 'Something went wrong when trying to create account'},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                                )
                        else:
                            return Response(
                                {'error': 'Email already exists'},
                                status=status.HTTP_400_BAD_REQUEST
                            )
                    else:
                        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response(
                        {'error': 'Password must be at least 8 characters in length'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(
                    {'error': 'Passwords do not match'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except KeyError as e:
            return Response(
                {'error': f'Missing key in data: {e}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except ValueError:
            return Response(
                {'error': 'Passwords do not match'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': f'Something went wrong when trying to register account: {e}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except:
            return Response(
                {'error': 'Something went wrong when trying to register account'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )