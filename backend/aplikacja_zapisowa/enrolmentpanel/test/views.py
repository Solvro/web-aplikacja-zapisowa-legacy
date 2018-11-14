from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

import json

from enrolmentpanel.models import Organiser, User, Event
from enrolmentpanel.utils.model_utils import create_new_student

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

    def post(self, request):
        username, password, faculty = self.get_elements_from_body(request.data)

        user = User.objects.create_user(
            username=username,
            password=password
            )
        user.is_organiser = True
        user.save()
        organiser = Organiser.objects.create(faculty=faculty, user=user)
        organiser.save()
        return Response({"status": "ok"})


class CreateStudentView(APIView):

    def post(self, request):
        event = Event.objects.all()[0]
        usr, pas = create_new_student(
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
