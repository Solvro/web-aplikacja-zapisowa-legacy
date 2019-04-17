from django.shortcuts import render
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
from enrolmentpanel.models import (
    Event,
    Room,
    Student, 
    User
)
from enrolmentpanel.serializers import RoomSerializer
from enrolmentpanel.utils.notify_utils import notify_consumers_on_room_change

import json


class StudentAlreadyRegisteredException(APIException):
    status_code = 400
    default_detail = 'Student already registered'

    def __init__(self, student_id):
        self.detail = f"{student_id} is already registered!"
        super().__init__(self)
    

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
            raise StudentAlreadyRegisteredException(student.index)

        room = self.get_room_for_solo(event)
        room.add_people([student])
        student.status = 'S'
        student.save()
        notify_consumers_on_room_change(event_name, room)

        return Response({
            "room_number": room.number,
            "capacity": room.max_capacity
        })


class GroupRoomView(APIView):
    
    permission_classes = (
        IsAuthenticated,
        IsStudentAccount,
        IsStudentParticipatingInEvent)

    # to jest rakowe fchuj, trz zrefactorować xD
    def get_users_from_request(self, request):
        group_users = []
        group_users.append(request.user.username)
        return group_users + request.data.get('logins')

    def get_students_from_users(self, user_names):
        users_models = [User.objects.get(username=u) for u in user_names]
        students = [um.participant for um in users_models]

        return students

    def validate_students(self, students):
        for student in students:
            if not student.status == 'N':
                raise StudentAlreadyRegisteredException(student.index)

    def post(self, request, event_name, room_no):
        user_names = self.get_users_from_request(request)
        students = self.get_students_from_users(user_names)
        event = Event.objects.get(pk=event_name)

        self.check_object_permissions(request, event)

        self.validate_students(students)

        room = Room.objects.get(number=room_no, event=event_name)

        room.add_people(students)

        for student in students:
            student.status = 'G'
            student.save()
        notify_consumers_on_room_change(event_name, room)

        return Response({
            "room_number": room.number,
            "capacity": room.max_capacity
        }, status=status.HTTP_200_OK)
