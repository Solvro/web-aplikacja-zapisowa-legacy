from django.db import transaction
from django.shortcuts import render
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_yasg.utils import swagger_auto_schema

from .permissions import (IsOrganiserAccount, IsEventOwner)
from enrolmentpanel.models import Event
from enrolmentpanel.serializers import StudentSerializer, EventSerializer


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

        request.data['event'] = event_name # event -> event_name (because 'event' is not a pk, but an object)
        student_serializer = StudentSerializer(data=request.data)
        if student_serializer.is_valid(raise_exception=True):
            student_serializer.save()
        return Response(student_serializer.initial_data)


class CreateEventView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount)
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(request_body=EventSerializer,
                         operation_description="Creates event. Creation is atomic.")
    @transaction.atomic
    def post(self, request):
        event_serializer = EventSerializer(data=request.data, context={'user': request.user})
        if event_serializer.is_valid(raise_exception=True):
            event_serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    @swagger_auto_schema(responses={200: EventSerializer(many=True)},
                         operation_description="Gets all organisers events")
    def get(self, request):
        event = Event.objects.filter(organizer__user=request.user)
        event_serializer = EventSerializer(event, many=True)
        return Response(event_serializer.data)
