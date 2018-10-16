from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import IsStudentAccount


class TestView(APIView):

    permission_classes = (IsAuthenticated, IsStudentAccount)

    def get(self, request):
        data = {
            'sub': 'marine'
        }
        return Response(data)