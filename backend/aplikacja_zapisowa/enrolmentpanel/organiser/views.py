from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import IsOrganiserAccount
from enrolmentpanel.models import Event
from enrolmentpanel.utils.model_utils import create_new_student


class TestView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount)

    def get(self, request):
        data = {
            'sub': 'marine'
        }
        return Response(data)

class CreateStudentView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount)

    def post(self, request):
        event_pk = request.data.get("event")
        student_index = request.data.get("index")
        student_sex = request.data.get("sex")
        name = request.data.get("name")
        faculty = request.data.get("faculty")

        event = Event.objects.get(pk=event_pk)

        create_new_student(
            student_index,
            event,
            student_sex,
            name,
            faculty
        )

        return Response({"status": "maybe ok"})