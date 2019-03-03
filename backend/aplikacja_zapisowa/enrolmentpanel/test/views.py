from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema

import json

from enrolmentpanel.models import Organiser, User, Event, Student
from enrolmentpanel.serializers import OrganiserSerializer, StudentSerializer


# Create your views here.
class TestView(APIView):
    """
    Just a test view. Nothing spectacular
    """

    renderer_classes = (JSONRenderer, )

    def get(self, request):
        data = {
            'sub': 'marine'
        }
        return Response(data)


class CreateOrganiserUserView(APIView):

    parser_classes = (JSONParser, )
    renderer_classes = (JSONRenderer, )

    def get_elements_from_body(self, body):
        username = body.get("username")
        password = body.get("password")
        faculty = body.get("faculty")

        if username and password and faculty:
            return (
                username,
                password,
                int(faculty)
            )
        raise KeyError

    @swagger_auto_schema(request_body=OrganiserSerializer,
                         operation_description="Creates organiser")
    def post(self, request):
        organiser_serializer = OrganiserSerializer(data=request.data)
        if organiser_serializer.is_valid(raise_exception=True):
            organiser_serializer.save()
        return Response({"status": "ok"})


class CreateStudentView(APIView):

    @swagger_auto_schema(request_body=StudentSerializer,
                         operation_description="Creates student")
    def post(self, request):
        event = Event.objects.all()[0]
        _, usr, pas = Student.objects.create(
            request.data.get('index'),
            event,
            'M',
            request.data.get('name'),
            11
        )

        return Response(
            {'username': usr, 'password': pas},
            status=status.HTTP_201_CREATED
        )
