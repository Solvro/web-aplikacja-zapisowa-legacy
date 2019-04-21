import json
import re

from channels.generic.websocket import AsyncWebsocketConsumer

from enrolmentpanel.models import (
    Event,
    Room,
)
from enrolmentpanel.serializers import PartialRoomSerializer


class RoomConsumer(AsyncWebsocketConsumer):

    def create_channel_group_name(self, event_name, username):
        event_name = re.sub('[^0-9a-zA-Z]+', '_', event_name)
        username = re.sub('[^0-9a-zA-Z]+', '_', username)
        return f'event_{event_name}_{username}'

    async def connect(self):
        self.event_name = self.scope['url_route']['kwargs']['event_name']
        event = Event.objects.get(name=self.event_name)
        self.channel_group_name = self.create_channel_group_name(self.event_name, event.organizer.user.username)
        await self.channel_layer.group_add(
            self.channel_group_name,
            self.channel_name
        )

        await self.accept()

        rooms = event.room_set.all()
        rooms_serialized = [
            PartialRoomSerializer(room).data
            for room in rooms
        ]

        data = json.dumps({
            'rooms': rooms_serialized
        })

        await self.send(text_data=data)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.channel_group_name,
            self.channel_name
        )

    # Receive message from room group
    async def room_update(self, event):
        if event.get('room'):
            await self.send(text_data=json.dumps({
                'room': event['room']
            }))
        else:
            pass