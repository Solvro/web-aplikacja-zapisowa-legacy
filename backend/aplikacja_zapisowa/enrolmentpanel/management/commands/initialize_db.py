from django.core.management.base import BaseCommand, CommandError

from enrolmentpanel.models import (
    Event,
    Organiser,
    Student,
    Room,
)

from enrolmentpanel.management.data.example_data import (
    USERS,
    EVENT,
    ORGANISER,
    ROOMS,
)

class Command(BaseCommand):
    help = 'Bootstraps empty db with predefinied objects, used for development purposes only'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting db bootstraping...'))
        self.stdout.write(self.style.SUCCESS('Creating Organiser user'))

        o = Organiser.objects.create(**ORGANISER)

        self.stdout.write(self.style.SUCCESS(
            'Created organiser user with data: {}'.format(ORGANISER)))

        self.stdout.write(self.style.SUCCESS('Creating event...'))

        event_data = EVENT.copy()
        event_data.update({'organiser': o})

        e = Event(**event_data)
        e.save()

        self.stdout.write(self.style.SUCCESS(
            'Created Event with data: {}'.format(EVENT)))

        self.stdout.write(self.style.SUCCESS('Creating rooms...'))

        for room in ROOMS:
            room_data = room.copy()
            room_data.update({'event': e})

            r = Room(**room_data)
            r.save()
            self.stdout.write(self.style.SUCCESS(
                'Created room with data: {}'.format(room)))

        self.stdout.write(self.style.SUCCESS('Creating students...'))

        for student in USERS:
            student_data = student.copy()
            student_data.update({'event': e})

            _ = Student.objects.create(**student_data)

        self.stdout.write(self.style.SUCCESS('Bootstraping completed ;)'))
