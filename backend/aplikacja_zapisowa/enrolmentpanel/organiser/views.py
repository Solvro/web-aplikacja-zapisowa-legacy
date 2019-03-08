from django.shortcuts import render

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_yasg.utils import swagger_auto_schema

from .permissions import (IsOrganiserAccount, IsEventOwner)
from enrolmentpanel.models import Event
from enrolmentpanel.serializers import StudentSerializer


class TestView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount, IsEventOwner)

    @swagger_auto_schema(responses={200: "{\"sub\": \"marine\"}"},
                         operation_description="Test endpoint for organiser auth")
    def get(self, request, event_name):
        event = Event.objects.get(pk=event_name)

        self.check_object_permissions(request, event)

        data = {
            'sub': 'marine'
        }
        return Response(data)

class CreateStudentView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount, IsEventOwner)

    @swagger_auto_schema(request_body=StudentSerializer,
                         operation_description="Creates student")
    def post(self, request, event_name):
        event = Event.objects.get(pk=event_name)
        self.check_object_permissions(request, event)

        request.data['event'] = event
        student_serializer = StudentSerializer(data=request.data)
        if student_serializer.is_valid(raise_exception=True):
            student_serializer.save()
        return Response(student_serializer.data)
