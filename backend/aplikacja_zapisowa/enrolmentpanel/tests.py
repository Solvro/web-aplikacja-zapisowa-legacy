from django.test import TestCase
from .models import Rally, Student, Room
from django.db.utils import IntegrityError, DataError


class StudentTestCase(TestCase):
    rally = None

    def setUp(self):
        self.rally = Rally(name='Rally1', max_people=100)
        self.rally.save()

    def test_student_creation(self):
        student = Student(username='236775',
                          rally=self.rally,
                          index='236775',
                          sex='M',
                          room=None)
        student.save()
        print(student.username)
        self.assertEqual(1, len(Student.objects.all()))


# class RallyTestCase(TestCase):
#     rally = None
#
#     def setUp(self):
#         self.rally = Rally(name='Rally1', max_people=100)
#         self.rally.save()
#
#     def test_rally_creation(self):
#         self.assertRaises(IntegrityError, Rally('Rally1', max_people=200).save())
#         # NOTE dunno what is going on
#         self.assertRaises(IntegrityError, Rally('Rally2', max_people=-100).save())
#
#     def test_deletion(self):
#         for i in range(100):
#             Room(rally=self.rally,
#                  number=i).save()
#             Student(username=i,
#                     rally=self.rally,
#                     index=i,
#                     sex='M',
#                     room=None).save()
#         new_rally = Rally(rally_name='Rally2', max_people=120)
#         new_rally.save()
#         for i in range(100, 120):
#             Room(rally=new_rally,
#                  number=i).save()
#             Student(username=i,
#                     rally=new_rally,
#                     index=i,
#                     sex='M',
#                     room=None).save()
#         self.rally.delete()
#         self.assertEqual(20, len(Student.objects.all()))
#         self.assertEqual(20, len(Room.objects.all()))


