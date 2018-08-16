from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

# Create your views here.
class TestView(APIView):

    renderer_classes = (JSONRenderer, )

    def get(self, request):
        data = {
            'sub': 'marine'
        }
        return Response(data)