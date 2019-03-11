from django.urls import path

from .views import (
    CreateEventView,
    CreateStudentView,
    TestView,
)

urlpatterns = [
    path('', TestView.as_view()),
    path('student', CreateStudentView.as_view()),
    path('event', CreateEventView.as_view())
]