from django.urls import path

from .views import (
    CreateEventView,
    CreateStudentView,
    TestView,
)

urlpatterns = [
    path('event', CreateEventView.as_view())
    path('<event_name>/test/', TestView.as_view()),
    path('<event_name>/student/', CreateStudentView.as_view())
]