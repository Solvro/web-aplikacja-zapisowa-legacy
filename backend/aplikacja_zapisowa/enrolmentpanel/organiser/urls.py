from django.urls import path

from .views import (
    CreateStudentView,
    TestView
)

urlpatterns = [
    path('', TestView.as_view()),
    path('student', CreateStudentView.as_view())
]