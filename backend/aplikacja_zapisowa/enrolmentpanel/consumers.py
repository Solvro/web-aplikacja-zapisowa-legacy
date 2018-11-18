import json

from channels.generic.websocket import AsyncWebsocketConsumer

from enrolmentpanel.constants import CHANNEL_GROUP
from enrolmentpanel.models import Room
from enrolmentpanel.serializers import PartialRoomSerializer


class RoomConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.channel_layer.group_add(
            CHANNEL_GROUP,
            self.channel_name
        )

        await self.accept()

        rooms = Room.objects.all()
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
            CHANNEL_GROUP,
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