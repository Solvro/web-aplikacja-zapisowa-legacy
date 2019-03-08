from django.conf.urls import url

from enrolmentpanel import consumers

websocket_urlpatterns = [
    url(r'^ws/(?P<event_name>[^/]+)/rooms/$', consumers.RoomConsumer),
]