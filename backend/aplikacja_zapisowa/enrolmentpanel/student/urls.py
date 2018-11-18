from django.urls import path

from .views import TestView, SoloRoomView

urlpatterns = [
    path('', TestView.as_view()),
    path('solo_register', SoloRoomView.as_view())
]