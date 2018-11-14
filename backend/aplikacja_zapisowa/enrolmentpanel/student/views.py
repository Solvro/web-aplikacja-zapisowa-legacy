from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import IsStudentAccount
from enrolmentpanel.models import Room, Student, User
from enrolmentpanel.serializers import RoomSerializer


class TestView(APIView):

    permission_classes = (IsAuthenticated, IsStudentAccount)

    def get(self, request):
        data = {
            'sub': 'marine'
        }
        return Response(data)


class SoloRoomView(APIView):

    permission_classes = (IsAuthenticated, IsStudentAccount)

    def get_room_for_solo(self, student):
        suitable_room = Room.objects\
            .filter(event=student.event, cur_capacity__gte=1)\
            .order_by('cur_capacity')[0]

        return suitable_room

    def post(self, request):
        student = Student.objects.get(user=request.user)
        room = self.get_room_for_solo(student)
        room.add_people([student])

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

    def get_suitable_rooms(self, size):
        rooms = Room.objects.filter(vacancies_gte=size).order_by('-max_capacity')
        if len(rooms) < 0:
            raise Exception
        return rooms

    def validate_students(self, students):
        for student in students:
            if not student.room is None:
                raise Exception
    
    def get(self, request):
        user_names = self.get_users_from_request(request)
        students = self.get_students_from_users(user_names)
        self.validate_students(students)

        rooms = self.get_suitable_rooms(len(user_names))
        resp = {'rooms': []}

        for room in rooms:
            serialized_room = RoomSerializer(room)
            resp['rooms'].append(serialized_room.data)

        return Response(resp)


    def post(self, request):
        user_names = self.get_users_from_request(request)
        students = self.get_students_from_users(user_names)
        self.validate_students(students)

        room = Room.objects.get(number=request.data['room']['number'])

        room.add_people(students)

        return Response({'status': 'ok'})
