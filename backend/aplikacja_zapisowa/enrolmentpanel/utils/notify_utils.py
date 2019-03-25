from asgiref.sync import async_to_sync

from channels.layers import get_channel_layer

from enrolmentpanel.serializers import PartialRoomSerializer


def notify_consumers_on_room_change(event_name, room):
    serialized_room = PartialRoomSerializer(room)

    channel_layer = get_channel_layer()

    channel_group = 'event_{}'.format(event_name)

    async_to_sync(channel_layer.group_send)(
        channel_group,
        {
            'type': 'room_update',
            'room': serialized_room.data
        }
    )
