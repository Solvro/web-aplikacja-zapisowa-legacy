from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from enrolmentpanel.models import Student, User
from enrolmentpanel.serializers import StudentSerializer


class StudentView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request, username):
        u = User.objects.get(username=username)
        queryset = Student.objects.all()
        student = get_object_or_404(queryset, user=u)
        serializer = StudentSerializer(student)

        return Response(serializer.data)
