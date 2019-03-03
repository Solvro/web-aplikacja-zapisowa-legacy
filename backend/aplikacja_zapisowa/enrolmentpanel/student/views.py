from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import IsStudentAccount
from enrolmentpanel.models import Room, Student, User
from enrolmentpanel.serializers import RoomSerializer
from enrolmentpanel.utils.notify_utils import notify_consumers_on_room_change

import json


class TestView(APIView):

    permission_classes = (IsAuthenticated, IsStudentAccount)

    @swagger_auto_schema(responses={200: "{\"sub\": \"marine\"}"},
                         operation_description="Test")
    def get(self, request):
        data = {
            'sub': 'marine'
        }
        return Response(data)


class SoloRoomView(APIView):

    permission_classes = (IsAuthenticated, IsStudentAccount)

    def get_room_for_solo(self, student):
        suitable_rooms = Room.objects.filter(
            event=student.event, vacancies__gte=1
        )

        return suitable_rooms[0]
    
    @swagger_auto_schema(responses={200: json.dumps({
                                    "room_number": 10,
                                    "capacity": 5
                                })},
                        operation_description="Registers solo user")
    def post(self, request):
        student = Student.objects.get(user=request.user)
        room = self.get_room_for_solo(student)
        room.add_people([student])
        notify_consumers_on_room_change(room)

        return Response({
            "room_number": room.number,
            "capacity": room.max_capacity
        })


class GroupRoomView(APIView):
    
    permission_classes = (IsAuthenticated, IsStudentAccount)

    def get_users_from_request(self, request):
        group_users = []
        group_users.append(request.user.username)
        group_users.append(request.data.get('logins'))

        return group_users

    def get_students_from_users(self, user_names):
        users_models = [User.objects.get(username=u) for u in user_names]
        students = [Student.objects.get(user=um) for um in users_models]

        return students

    def validate_students(self, students):
        for student in students:
            if not student.room is None:
                raise Exception
    
    def post(self, request):
        user_names = self.get_users_from_request(request)
        students = self.get_students_from_users(user_names)
        self.validate_students(students)

        room = Room.objects.get(number=request.data['room']['number'])

        room.add_people(students)
        notify_consumers_on_room_change(room)

        return Response({'status': 'ok'})
