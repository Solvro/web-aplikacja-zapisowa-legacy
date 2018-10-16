from django.urls import path

from .views import TestView, CreateOrganiserUserView

urlpatterns = [
    path('', TestView.as_view()),
    path('create_test', CreateOrganiserUserView.as_view())
]