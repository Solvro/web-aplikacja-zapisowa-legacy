from django.urls import path

from .views import (
    TestView,
    SoloRoomView,
    GroupRoomView
)

urlpatterns = [
    path('', TestView.as_view()),
    path('<event_name>/register/', SoloRoomView.as_view()),
    path('<event_name>/register/<room_no>/', GroupRoomView.as_view())
]