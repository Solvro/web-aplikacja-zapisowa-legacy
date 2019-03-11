from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_yasg.utils import swagger_auto_schema

from .permissions import IsOrganiserAccount
from enrolmentpanel.models import Event
from enrolmentpanel.serializers import StudentSerializer, EventSerializer


class TestView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount)

    def get(self, request):
        data = {
            'sub': 'marine'
        }
        return Response(data)

class CreateStudentView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount)

    @swagger_auto_schema(request_body=StudentSerializer,
                         operation_description="Creates student")
    def post(self, request):
        student_serializer = StudentSerializer(data=request.data)
        if student_serializer.is_valid(raise_exception=True):
            student_serializer.save()
        return Response(student_serializer.data)


class CreateEventView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount)
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(request_body=EventSerializer,
                         operation_description="Creates event")
    def post(self, request):
        event_serializer = EventSerializer(data=request.data, context={'user': request.user})
        if event_serializer.is_valid(raise_exception=True):
            event_serializer.save()
        return Response(event_serializer.data)

    @swagger_auto_schema(respoonses={200: EventSerializer},
                         operation_description="Gets all organisers events")
    def get(self, request):
        event = Event.objects.filter(organizer__user=request.user)
        event_serializer = EventSerializer(event, many=True)
        return Response(event_serializer.data)
