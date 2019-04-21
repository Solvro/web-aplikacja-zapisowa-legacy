from asgiref.sync import async_to_sync

from channels.layers import get_channel_layer

from enrolmentpanel.serializers import PartialRoomSerializer

import re


def notify_consumers_on_room_change(event_name, organiser_username, room):
    serialized_room = PartialRoomSerializer(room)

    channel_layer = get_channel_layer()
    organiser_username = re.sub('[^0-9a-zA-Z]+', '_', organiser_username)
    event_name = re.sub('[^0-9a-zA-Z]+', '_', event_name)

    channel_group = 'event_{}_{}'.format(event_name, organiser_username)

    async_to_sync(channel_layer.group_send)(
        channel_group,
        {
            'type': 'room_update',
            'room': serialized_room.data
        }
    )
