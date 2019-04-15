from django.urls import path

from .views import (
    CreateEventView,
    CreateStudentView,
    TestView,
    DetailEventView,
    StudentStatusView,
    DetailRoomListView,
    CustomEmailView,
    StudentEditView
)

urlpatterns = [
    path('event', CreateEventView.as_view()),
    path('event/<event_name>', DetailEventView.as_view()),
    path('event/<event_name>/rooms', DetailRoomListView.as_view()),
    path('<event_name>/test/', TestView.as_view()),
    path('<event_name>/student/', CreateStudentView.as_view()),
    path('<event_name>/students_status/', StudentStatusView.as_view()),
    path('<event_name>/email/', CustomEmailView.as_view()),
    path('<event_name>/student/<student_index>', StudentEditView.as_view())
]