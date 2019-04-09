from django.conf import settings
from django.shortcuts import get_object_or_404

from drf_yasg.utils import swagger_auto_schema

from rest_framework.exceptions import APIException
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from enrolmentpanel.models import Student, User, Event
from enrolmentpanel.serializers import (
    StudentSerializer,
    OrganiserSerializer
)
from enrolmentpanel.organiser.permissions import IsEventOwner


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer, cls).get_token(user)

        if user.is_participant:
            logged_student = user.participant
            serializer = StudentSerializer(logged_student)

            token['student'] = serializer.data
            token['room'] = (not logged_student.room is None)
            serialized_room_mates = []

            if token['room']:
                room_mates = Student.objects.get(room=logged_student.room)
                
                try:
                    for room_mate in room_mates:
                        if room_mate != logged_student:
                            serialized_room_mates.append(
                                StudentSerializer(room_mate).data
                            )
                except Exception:
                    pass

            token['roomMates'] = serialized_room_mates
        elif user.is_organiser:
            organiser_data = OrganiserSerializer(user.organiser).data
            organiser_data.pop("user")
            token['organiserInfo'] = organiser_data

        return token

    def validate(self, attrs):
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)

        token = self.get_token(self.user)

        if self.user.is_participant:
            data['student'] = token['student']
            data['room'] = token['room']
            data['roomMates'] = token['roomMates']
        elif self.user.is_organiser:
            data['organiser'] = token['organiserInfo']

        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class StudentView(APIView):

    if not settings.DEBUG:
        permission_classes = (IsAuthenticated, IsEventOwner)

    @swagger_auto_schema(responses={200: StudentSerializer()},
                         operation_description="Gets student by username")
    def get(self, request, event_name, username):
        e = Event.objects.get(pk=event_name)
        u = User.objects.get(username=username)

        try:
            self.check_object_permissions(request, e)
        except APIException:
            # TODO
            raise Exception

        queryset = Student.objects.all()
        student = get_object_or_404(queryset, user=u)
        if e == student.event:
            serializer = StudentSerializer(student)
            return Response(serializer.data)
        else:
            # TODO
            raise Exception
