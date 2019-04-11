from django.urls import path

from .views import (
    CreateEventView,
    CreateStudentView,
    TestView,
    DetailEventView,
    DetailRoomListView
)

urlpatterns = [
    path('event', CreateEventView.as_view()),
    path('event/<event_name>', DetailEventView.as_view()),
    path('event/<event_name>/rooms', DetailRoomListView.as_view()),
    path('<event_name>/test/', TestView.as_view()),
    path('<event_name>/student/', CreateStudentView.as_view())
]