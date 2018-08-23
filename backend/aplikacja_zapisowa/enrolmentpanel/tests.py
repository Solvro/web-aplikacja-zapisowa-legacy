from django.test import TestCase
from django.db.utils import IntegrityError, DataError
from .models import Rally, Room, Student

class StudentTestCase(TestCase):
    index = '236775'
    username = '236775'
    sex = 'M'

    def setUp(self):
        self.rally = Rally(name='Rally1', max_people=100)
        self.rally.save()
        self.student = Student(username=self.index,
                               rally=self.rally,
                               index=self.username,
                               sex=self.sex)
        self.student.save()

    def test_one_student_in_more_rallies(self):
        rally_another = Rally(name='Rally2', max_people=200)
        rally_another.save()
        student1 = Student(username=self.username,
                           rally=rally_another,
                           index=self.index,
                           sex=self.sex)
        student1.save()
        self.assertEqual(2, len(Student.objects.all()))

    def test_student_not_doubled(self):
        student2 = Student(username=self.username,
                           rally=self.rally,
                           index=self.index,
                           sex='F',
                           room=None)
        self.assertRaises(IntegrityError, student2.save)


class RallyTestCase(TestCase):

    def setUp(self):
        self.rally = Rally(name='Rally1', max_people=100)
        self.rally.save()

    def test_doubled_rally(self):
        rally2 = Rally(name='Rally1', max_people=200)
        self.assertIsNot(self.rally, rally2)
        # Exception is not thrown but number of rallies stays the same
        rally2.save()
        self.assertEqual(1, len(Rally.objects.all()))

    # def test_rally_with_minus_attendance(self):
    #     self.assertRaises(IntegrityError, Rally('Rally2', max_people=-100).save)

    def test_deletion(self):
        for i in range(100):
            Room(rally=self.rally,
                 number=i,
                 max_capacity=50).save()
            Student(username=str(i),
                    rally=self.rally,
                    index=str(i),
                    sex='M').save()
        new_rally = Rally(name='Rally2', max_people=120)
        new_rally.save()
        for i in range(100, 120):
            Room(rally=new_rally,
                 number=i,
                 max_capacity=10).save()
            Student(username=str(i),
                    rally=new_rally,
                    index=str(i),
                    sex='M').save()
        self.rally.delete()
        self.assertEqual(20, len(Student.objects.all()))
        self.assertEqual(20, len(Room.objects.all()))


class RoomTestCase(TestCase):
    def setUp(self):
        self.rally = Rally(name='Konwent Jamników',
                           max_people=10000)
        self.rally.save()

    def test_doubled_room(self):
        for i in range(2):
            room = Room(number=1,
                        rally=self.rally,
                        max_capacity=i)
            room.save()
        self.assertEqual(1, Room.objects.all().count())
        rally2 = Rally(name='Konwent Jamników2',
                       max_people=10000)
        rally2.save()
        room2 = Room(number=1,
                     rally=rally2,
                     max_capacity=2)
        room2.save()
        self.assertEqual(2, Room.objects.all().count())

    def test_room_with_no_capacity(self):
        room = Room(number=200,
                    rally=self.rally,
                    max_capacity=0)
        room.save()
        self.assertFalse(Room.objects.all())

    def test_gradually_add_people(self):
        for i in range(5):
            Student(index=str(i),
                    rally=self.rally,
                    sex='F').save()
        people = list(Student.objects.all())
        room = Room(number=69,
                    rally=self.rally,
                    max_capacity=4)
        room.save()
        room.add_people(people[:3])
        self.assertNotIn(None, [person.room for person in people[:3]])
        room.add_people([people[3]])
        self.assertEqual(people[3].room, room)
        room.add_people([people[4]])
        self.assertIsNone(people[4].room)

    def test_add_to_much_people(self):
        for i in range(5):
            Student(index=str(i),
                    rally=self.rally,
                    sex='F').save()
        people = list(Student.objects.all())
        room = Room(number=69,
                    rally=self.rally,
                    max_capacity=4)
        room.save()
        room.add_people(people)
        self.assertNotIn(room, [person.room for person in people])
