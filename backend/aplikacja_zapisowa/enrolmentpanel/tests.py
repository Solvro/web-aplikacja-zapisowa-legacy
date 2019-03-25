from django.test import TestCase
from django.db import transaction
from django.db.utils import IntegrityError, DataError
from .models import Event, Room, Student, Admin
from .exceptions import NotPositiveNumberOfPeople
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


class AdminTestCase(TestCase):
    username = 'sernikjamnika'
    name = 'Mateusz'
    surname = 'Walczak'
    faculty = 11

    def setUp(self):
        user = User.objects.create_user(username=self.username,
                                        first_name=self.name,
                                        last_name=self.surname,
                                        password='jamniki69')
        self.admin = Admin(user=user,
                           faculty=self.faculty)
        self.admin.save()

    def test_admin_authentication(self):
        self.assertIsNotNone(authenticate(username=self.username, password='jamniki69'))

    def test_admin_deletion(self):
        user = User.objects.create_user(username='sjdoafn',
                                        first_name=self.name,
                                        last_name=self.surname,
                                        password='jamniki69')
        admin2 = Admin(user=user,
                       faculty=2)
        admin2.save()

        self.assertEqual(len(Admin.objects.all()), 2)
        self.assertEqual(len(User.objects.all()), 2)

        admins = Admin.objects.filter(user__username='sernikjamnika').all()
        admins[0].delete()

        self.assertEqual(len(Admin.objects.all()), 1)
        self.assertEqual(len(User.objects.all()), 1)


class StudentTestCase(TestCase):
    index = '236775'
    username = '236775'
    sex = 'M'
    name = 'Mateusz'
    surname = 'Walczak'

    def setUp(self):
        user_admin = User.objects.create_user(username='admin1234',
                                              first_name=self.name,
                                              last_name=self.surname,
                                              password='jamniki69')
        self.admin = Admin(user=user_admin,
                           faculty=2)
        self.admin.save()
        self.event = Event(name='Event1', max_people=100, organiser=self.admin)
        self.event.save()
        self.student = Student(event=self.event,
                               index=self.index,
                               sex=self.sex)
        self.student.save()

    def test_one_student_in_more_rallies(self):
        event_another = Event(name='Event2', max_people=200, organiser=self.admin)
        event_another.save()
        student1 = Student(event=event_another,
                           index=self.index,
                           sex=self.sex)
        student1.save()
        self.assertEqual(2, len(Student.objects.all()))

    def test_student_not_doubled(self):
        # user = User.objects.create_user(username=self.username, password='a')
        student2 = Student(event=self.event,
                           index=self.index,
                           sex='F')
        self.assertRaises(IntegrityError, student2.save)


class EventTestCase(TestCase):

    def setUp(self):
        username = 'sernikjamnika'
        name = 'Mateusz'
        surname = 'Walczak'
        faculty = 11

        user = User.objects.create_user(username=username,
                                        first_name=name,
                                        last_name=surname,
                                        password='jamniki69')
        self.admin = Admin(user=user,
                           faculty=faculty)
        self.admin.save()

        self.event = Event(name='Event1', max_people=100, organiser=self.admin)
        self.event.save()

    def test_doubled_event(self):
        event2 = Event(name='Event1', max_people=200, organiser=self.admin)
        self.assertIsNot(self.event, event2)
        # Exception is not thrown but number of rallies stays the same
        event2.save()
        self.assertEqual(1, len(Event.objects.all()))

    def test_delete_if_admin_deleted(self):
        self.admin.delete()
        self.assertEqual(len(Event.objects.all()), 0)

    def test_get_event_by_organiser(self):
        events = Event.objects.filter(organiser__user__username='sernikjamnika').all()
        events[0].delete()
        self.assertEqual(len(Event.objects.all()), 0)
    # def test_deletion(self):
    #     for i in range(100):
    #         Room(event=self.event,
    #              number=i,
    #              max_capacity=50).save()
    #         Student(username=str(i),
    #                 event=self.event,
    #                 index=str(i),
    #                 sex='M').save()
    #     new_event = Event(name='Event2', max_people=120)
    #     new_event.save()
    #     for i in range(100, 120):
    #         Room(event=new_event,
    #              number=i,
    #              max_capacity=10).save()
    #         Student(username=str(i),
    #                 event=new_event,
    #                 index=str(i),
    #                 sex='M').save()
    #     self.event.delete()
    #     self.assertEqual(20, len(Student.objects.all()))
    #     self.assertEqual(20, len(Room.objects.all()))
#
#
# class RoomTestCase(TestCase):
#     def setUp(self):
#         self.event = Event(name='Konwent Jamników',
#                            max_people=10000)
#         self.event.save()
#
#     def test_doubled_room(self):
#         room = Room(number=1,
#                     event=self.event,
#                     max_capacity=1)
#         room.save()
#         room = Room(number=1,
#                     event=self.event,
#                     max_capacity=20)
#         event2 = Event(name='Konwent Jamników2',
#                        max_people=10000)
#         event2.save()
#         room2 = Room(number=1,
#                      event=event2,
#                      max_capacity=2)
#         room2.save()
#         self.assertEqual(2, Room.objects.all().count())
#         self.assertRaises(IntegrityError, room.save)
#
#     def test_room_with_no_capacity(self):
#         room = Room(number=200,
#                     event=self.event,
#                     max_capacity=0)
#         self.assertRaises(NotPositiveNumberOfPeople, room.save)
#         self.assertEqual(len(Room.objects.all()), 0)
#
#     def test_gradually_add_people(self):
#         for i in range(5):
#             Student(index=str(i),
#                     event=self.event,
#                     sex='F').save()
#         people = list(Student.objects.all())
#         room = Room(number=69,
#                     event=self.event,
#                     max_capacity=4)
#         room.save()
#         room.add_people(people[:3])
#         self.assertNotIn(None, [person.room for person in people[:3]])
#         room.add_people([people[3]])
#         self.assertEqual(people[3].room, room)
#         room.add_people([people[4]])
#         self.assertIsNone(people[4].room)
#
#     def test_add_to_much_people(self):
#         for i in range(5):
#             Student(index=str(i),
#                     event=self.event,
#                     sex='F').save()
#         people = list(Student.objects.all())
#         room = Room(number=69,
#                     event=self.event,
#                     max_capacity=4)
#         room.save()
#         room.add_people(people)
#         self.assertNotIn(room, [person.room for person in people])
