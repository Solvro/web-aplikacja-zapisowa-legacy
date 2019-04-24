from django.conf import settings
from django.shortcuts import get_object_or_404

from drf_yasg.utils import swagger_auto_schema

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response 

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from enrolmentpanel.models import Student, User, Event
from enrolmentpanel.student.permissions import IsStudentParticipatingInEvent
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
            token['register_status'] = logged_student.status
            token['room'] = None if logged_student.room is None else logged_student.room.number
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
        elif self.user.is_organiser:
            data['organiser'] = token['organiserInfo']

        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class StudentView(APIView):

    permission_classes = (IsAuthenticated, IsStudentParticipatingInEvent)


    @swagger_auto_schema(responses={200: StudentSerializer()},
                         operation_description="Gets student by username")
    def get(self, request, event_name, username):
        e = Event.objects.get(pk=event_name)
        u = User.objects.get(username=username)

        self.check_object_permissions(request, e)

        queryset = Student.objects.all()
        student = get_object_or_404(queryset, user=u)
        if e == student.event:
            splited_name = student.name.split()
            name, surname = splited_name[0], splited_name[-1]
            student.name = f'{name} {surname[0]}.'
            serializer = StudentSerializer(student)
            return Response(serializer.data)
        else:
            # TODO
            raise Exception
