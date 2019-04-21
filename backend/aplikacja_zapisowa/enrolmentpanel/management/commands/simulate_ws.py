import random
import time

from django.core.management.base import BaseCommand, CommandError
from django.db.models.aggregates import Count

from enrolmentpanel.models import (
    Event,
    Organiser,
    Student,
    Room,
)

from enrolmentpanel.utils.notify_utils import notify_consumers_on_room_change


class Command(BaseCommand):
    help = 'Bootstraps empty db with predefinied objects, used for development purposes only'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting ws simulation...'))

        event = Event.objects.get(name="testowy")

        self.stdout.write(self.style.SUCCESS('Creating test user...'))
        try:
            student_data = {
                "index": "123",
                "sex": "F",
                "name": "Bateusz Palczak",
                "faculty": 9,
                "event": event
            }
            s, _, _ = Student.objects.create(**student_data)
            self.stdout.write(self.style.SUCCESS('test user created!'))
        except Exception:
            s = Student.objects.get(index=123)
            self.stdout.write(self.style.WARNING('User already created!'))

        self.stdout.write(self.style.SUCCESS('Starting simulation ;)'))
        while True:
            time.sleep(1)

            count = Room.objects.aggregate(count=Count('pk'))['count']
            random_index = random.randint(0, count - 1)

            room = Room.objects.filter(event=event).all()[random_index]
            room.add_people((s, ))
            notify_consumers_on_room_change(event.name, event.organizer.user.username, room)

            self.stdout.write(self.style.SUCCESS(
                'Added user to room: {}'.format(room.number)))
            time.sleep(random.randint(1, 10))

            room.remove_person(s)
            notify_consumers_on_room_change(event.name, event.organizer.user.username, room)
            self.stdout.write(self.style.SUCCESS(
                'Removed user from room: {}'.format(room.number)))
            time.sleep(random.randint(1, 10))

