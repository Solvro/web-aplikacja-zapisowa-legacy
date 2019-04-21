from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from drf_yasg.utils import swagger_auto_schema

from .permissions import (
    IsStudentAccount,
    IsStudentParticipatingInEvent
)
from enrolmentpanel.exceptions import (
    StudentAlreadyRegisteredException,
    StudentNotFoundException,
)
from enrolmentpanel.models import (
    Event,
    Room,
    Student, 
    User
)
from enrolmentpanel.serializers import RoomSerializer
from enrolmentpanel.utils.notify_utils import notify_consumers_on_room_change

import json
    

class TestView(APIView):

    permission_classes = (IsAuthenticated, IsStudentAccount)

    @swagger_auto_schema(responses={200: "{\"sub\": \"marine\"}"},
                         operation_description="Test endpoint for students auth")
    def get(self, request):
        data = {
            'sub': 'marine'
        }
        return Response(data)


class SoloRoomView(APIView):

    permission_classes = (
        IsAuthenticated,
        IsStudentAccount,
        IsStudentParticipatingInEvent
    )

    def get_room_for_solo(self, event):
        suitable_room = Room.objects.filter(
            event=event, vacancies__gte=1
        ).last()

        return suitable_room
    
    @swagger_auto_schema(responses={200: json.dumps({
                                    "room_number": 10,
                                    "capacity": 5
                                })},
                        operation_description="Registers solo user")
    def post(self, request, event_name):
        student = request.user.participant
        event = Event.objects.get(pk=event_name)

        self.check_object_permissions(request, event)

        if student.status != 'N':
            raise StudentAlreadyRegisteredException(student)

        room = self.get_room_for_solo(event)
        room.add_people([student])
        student.status = 'S'
        student.save()
        notify_consumers_on_room_change(event_name, event.organizer.user.username, room)

        return Response(
            RoomSerializer(room).data,
            status=status.HTTP_200_OK
        )


class GroupRoomView(APIView):
    
    permission_classes = (
        IsAuthenticated,
        IsStudentAccount,
        IsStudentParticipatingInEvent)

    def get_students_from_users(self, user_names):
        participants = []
        for name in user_names:
            try:
                participants.append(Student.objects.get(user__username=name))
            except Student.DoesNotExist:
                raise StudentNotFoundException(name)

        return participants

    def validate_students(self, students):
        for student in students:
            if not student.status == 'N':
                raise StudentAlreadyRegisteredException(student)

    def post(self, request, event_name, room_no):
        event = Event.objects.get(pk=event_name)
        self.check_object_permissions(request, event)
        try:
            students_list = request.data.get('logins')
            students_list.remove(request.user.username)
        except ValueError:
            pass

        students = self.get_students_from_users(students_list)
        students.append(request.user.participant)

        self.validate_students(students)

        room = Room.objects.get(number=room_no, event=event_name)

        room.add_people(students)

        for student in students:
            student.status = 'G'
            student.save()
        notify_consumers_on_room_change(event_name, event.organizer.user.username, room)


        return Response(
            RoomSerializer(room).data,
            status=status.HTTP_200_OK
        )
