from asgiref.sync import async_to_sync

from channels.layers import get_channel_layer

from enrolmentpanel.constants import CHANNEL_GROUP
from enrolmentpanel.serializers import PartialRoomSerializer


def notify_consumers_on_room_change(room):
    serialized_room = PartialRoomSerializer(room)

    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        CHANNEL_GROUP,
        {
            'type': 'room_update',
            'room': serialized_room.data
        }
    )
