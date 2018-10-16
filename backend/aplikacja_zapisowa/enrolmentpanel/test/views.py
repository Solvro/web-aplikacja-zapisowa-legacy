from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

import json

from enrolmentpanel.models import Organiser, User

# Create your views here.
class TestView(APIView):

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
