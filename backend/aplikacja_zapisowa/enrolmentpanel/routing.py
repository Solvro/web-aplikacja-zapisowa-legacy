from django.conf.urls import url

from enrolmentpanel import consumers

websocket_urlpatterns = [
    url(r'^ws/rooms/$', consumers.RoomConsumer),
]