from django.urls import path

from .views import TestView, CreateOrganiserUserView, CreateStudentView

urlpatterns = [
    path('', TestView.as_view()),
    path('add_organiser', CreateOrganiserUserView.as_view()),
    path('add_student', CreateStudentView.as_view())
]