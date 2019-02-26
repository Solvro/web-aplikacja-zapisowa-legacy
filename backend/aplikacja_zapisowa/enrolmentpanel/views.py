from django.conf import settings
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from enrolmentpanel.models import Student, User
from enrolmentpanel.serializers import StudentSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer, cls).get_token(user)

        if user.is_participant:
            logged_student = Student.objects.get(user=user)
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

        return token

    def validate(self, attrs):
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)

        token = self.get_token(self.user)

        if self.user.is_participant:
            data['student'] = token['student']
            data['room'] = token['room']
            data['roomMates'] = token['roomMates']

        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class StudentView(APIView):

    if not settings.DEBUG:
        permission_classes = (IsAuthenticated, )

    def get(self, request, username):
        u = User.objects.get(username=username)
        queryset = Student.objects.all()
        student = get_object_or_404(queryset, user=u)
        serializer = StudentSerializer(student)

        return Response(serializer.data)
