from django.conf import settings
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from enrolmentpanel.views import (
    CustomTokenObtainPairView,
    StudentView
)


urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('organiser/', include('enrolmentpanel.organiser.urls')),
    path('student/', include('enrolmentpanel.student.urls')),
    path('token', CustomTokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
    path('token/', CustomTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify', TokenVerifyView.as_view()),
    path('students/<username>', StudentView.as_view()),
]

if settings.DEBUG:
    urlpatterns.extend(
        [
            path('test/', include('enrolmentpanel.test.urls')),
        ]
    )
