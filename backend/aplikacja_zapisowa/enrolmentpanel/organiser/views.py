from django.core import exceptions
from django.db import transaction, IntegrityError
from django.db.models import Prefetch, F
from django.shortcuts import (
    render,
    get_object_or_404
)
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


from .permissions import (IsOrganiserAccount, IsEventOwner)
from enrolmentpanel.models import (
    Event,
    Student,
    Room,
    User
)
from enrolmentpanel.serializers import (
    PartialStudentSerializer,
    StudentSerializer,
    EventSerializer,
    RoomSerializer,
    RoomDetailedSerializer,
    CustomEmailViewSerializer,
    EventStatisticsSerializer,
)
from enrolmentpanel.exceptions import UniqueEventNameError

import logging

logger = logging.getLogger(__name__)


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
        student_serializer = StudentSerializer(data=request.data, context={'is_active': event.is_active})
        if student_serializer.is_valid(raise_exception=True):
            student_serializer.save()
        return Response(student_serializer.initial_data)


class CreateEventView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount)
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(request_body=EventSerializer,
                         operation_description="Creates event. Creation is atomic.",
                         responses={400: "{\"detail\": \"detail\"}"})
    @transaction.atomic
    def post(self, request):
        event_serializer = EventSerializer(data=request.data, context={'user': request.user})
        try:
            if event_serializer.is_valid(raise_exception=True):
                event_serializer.save()
        except ValidationError:
            raise UniqueEventNameError
        return Response(status=status.HTTP_201_CREATED)

    @swagger_auto_schema(responses={200: EventSerializer(many=True)},
                         operation_description="Gets all organiser's events.")
    def get(self, request):
        event = Event.objects.filter(organizer__user=request.user)
        event_serializer = EventSerializer(event, many=True)
        return Response(event_serializer.data)


class DetailEventView(APIView):
    permission_classes = (IsAuthenticated, IsOrganiserAccount)
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(responses={200: EventSerializer(),
                                    404: "{\"detail\": \"Not found\"}"},
                         operation_description="Gets event's details.")
    def get(self, request, event_name):
        event = get_object_or_404(Event, organizer__user=request.user, name=event_name)
        event_serializer = EventSerializer(event)
        return Response(event_serializer.data)
 
    @transaction.atomic
    def patch(self, request, event_name):
        event = get_object_or_404(Event, organizer__user=request.user, name=event_name)
        event_serializer = EventSerializer(event, request.data, partial=True)
        try:
            if event_serializer.is_valid(raise_exception=True):
                event_serializer.save()
        except ValidationError:
            raise UniqueEventNameError
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, event_name):
        event = get_object_or_404(
            Event.objects.filter(
                name=event_name,
                organizer__user=request.user
            )
        )
        event.delete()
        return Response(status=status.HTTP_202_ACCEPTED)


class StudentStatusView(APIView):
    permission_classes = (IsAuthenticated, IsOrganiserAccount, IsEventOwner)

    @swagger_auto_schema(
        responses={
            200: """
            {
                "stats": {
                    "students": 4,
                    "solo_students": 1,
                    "students_in_rooms": 1
                },
                "students": [
                    {
                        "name": "Jan Bibrowski",
                        "faculty": 11,
                        "sex": "M",
                        "status": "N",
                        "index": "236412"
                    }
                ]
            }
            """,
            404: "{\"detail\": \"Not found\"}"
        },
        operation_description="Lists all students with statuses and stats"
        )
    def get(self, request, event_name):
        event = get_object_or_404(Event, organizer__user=request.user, name=event_name)
        self.check_object_permissions(request, event)

        eventStudents = Student.objects.filter(event=event)
        soloStudentsCount = eventStudents.filter(status='S').count()
        groupStudentsCount = eventStudents.filter(status='G').count()

        statistics_data = {
            "students": eventStudents.count(),
            "solo_students": soloStudentsCount,
            "students_in_rooms": groupStudentsCount + soloStudentsCount
        }

        request.data['event'] = event
        student_serializer = PartialStudentSerializer(eventStudents, many=True)
            
        return Response({
            "stats": statistics_data,
            "students": student_serializer.data
        })


class DetailRoomListView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount)

    @swagger_auto_schema(
            responses={
                200: """
                {
                    "room_count": 0,
                    "free_count": 0,
                    "vacancies": 0,
                    "rooms": [
                        {
                            "number": 123,
                            "max_capacity": 12,
                            "vacancies": 0,
                            "cur_capacity": 0,
                            "sex_division": "N/A"
                        }
                    ]
                }
                """,
                404: "{\"detail\": \"Not found\"}"
            },
            operation_description="Lists all rooms and it stats. Additional it has sex_division which varies from \
            ['N/A', 'męski', 'zenski', 'koedukacyjny']")
    def get(self, request, event_name):
        event = get_object_or_404(Event.objects
                    .prefetch_related(Prefetch('room_set'), Prefetch('room_set__student_set')),
                    name=event_name, organizer__user=request.user)
        rooms_serializer = RoomDetailedSerializer(event.room_set.all(), many=True)
        rooms = rooms_serializer.data

        return Response({
            'room_count': len(rooms),
            'free_rooms': len([room for room in rooms if room['cur_capacity'] == 0]),
            'vacancies': sum([room['max_capacity'] - room['cur_capacity'] for room in rooms]),
            'rooms': rooms
        })


class CustomEmailView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount)

    @swagger_auto_schema(request_body=CustomEmailViewSerializer(),
                        operation_description="Sends custom email based on flags and indexes")
    def post(self, request, event_name):
        emails_serializer = CustomEmailViewSerializer(data=request.data, context={'event': event_name,
                                                                                  'user': request.user})
        if emails_serializer.is_valid():
            emails = emails_serializer.save()
            [email.send_email() for email in emails]
        return Response(status=status.HTTP_200_OK)


class StudentEditView(APIView):
    permission_classes = (IsAuthenticated, IsOrganiserAccount)

    @swagger_auto_schema(operation_description="Deletes student")
    def delete(self, request, event_name, student_index):
        student = get_object_or_404(Student.objects.select_related('room'),
            event=event_name,
            index=student_index,
            event__organizer__user=request.user)

        if student.room is not None:
            student.room.cur_capacity -= 1
            student.room.save()
        student.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

    @swagger_auto_schema(request_body=StudentSerializer(partial=True),
                         operation_description="""Patches student's info. Event acctually can not be changed.
                         Student's statuses means Not registered, Solo registered and Grouped registered respectively.""",
                         responses={
                                202: "Accepted",
                                400: "Bad Request"
                            })
    @transaction.atomic
    def patch(self, request, event_name, student_index):
        student = get_object_or_404(Student.objects.filter(
            event=event_name,
            index=student_index,
            event__organizer__user=request.user
        ))
        is_active = Event.objects.only('is_active').get(name=event_name, organizer__user=request.user).is_active
        student_serializer = StudentSerializer(student,
                                               request.data,
                                               partial=True,
                                               context={
                                                   'is_active': is_active
                                               })
        if student_serializer.is_valid():
            student_serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class EventStatisticsView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount)

    @swagger_auto_schema(responses={
                            200:"""
                            {
                                "students": {
                                    "no": 3
                                },
                                "students_registered": {
                                    "no": 2,
                                    "percentage": 66.67
                                },
                                "students_solo": {
                                    "no": 1
                                },
                                "rooms_not_full": {
                                    "no": 3,
                                    "percentage": 100.00
                                }
                            }
                            """,
                            404: "{\"detail\": \"Not found.\"}"
                        },
                        operation_description="Gets basic statistics about event's paricipant and rooms.")
    def get(self, request, event_name):
        event = get_object_or_404(
                    Event.objects.prefetch_related(
                        Prefetch('room_set'),
                        Prefetch('student_set')),
                    name=event_name, organizer__user=request.user)
        statistics_serializer = EventStatisticsSerializer(event)

        return Response(statistics_serializer.data, status=status.HTTP_200_OK)


class ActivationEventView(APIView):

    permission_classes = (IsAuthenticated, IsOrganiserAccount)

    @swagger_auto_schema(responses={
                            200: """{
                                "is_active": true
                            }""",
                            404:"""{
                                "detail": "Not found."
                            }"""
                         },
                         operation_description="Activates event and users.")
    def post(self, request, event_name):
        event = get_object_or_404(Event, name=event_name, organizer__user=request.user)
        event.is_active = not event.is_active
        event.save()

        User.objects.filter(
            participant__event=event_name,
            participant__event__organizer__user=request.user
        ).update(is_active=event.is_active)

        return Response({
            "is_active": event.is_active
        },
        status=status.HTTP_200_OK)
