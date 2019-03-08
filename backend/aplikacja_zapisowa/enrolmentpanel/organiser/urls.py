from django.urls import path

from .views import (
    CreateStudentView,
    TestView
)

urlpatterns = [
    path('<event_name>/test/', TestView.as_view()),
    path('<event_name>/student/', CreateStudentView.as_view())
]