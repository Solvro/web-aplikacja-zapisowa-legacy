from django.test import TestCase
from .models import Rally, Student, Room
from django.db.utils import IntegrityError, DataError


class StudentTestCase(TestCase):
    rally = None
    index = '236775'
    username = '236775'
    sex = 'M'
    student = None

    def setUp(self):
        self.rally = Rally(name='Rally1', max_people=100)
        self.rally.save()
        self.student = Student(username=self.index,
                               rally=self.rally,
                               index=self.username,
                               sex=self.sex,
                               room=None)
        self.student.save()

    def test_one_student_in_more_rallies(self):
        rally_another = Rally(name='Rally1', max_people=200)
        rally_another.save()
        student1 = Student(username=self.username,
                           rally=rally_another,
                           index=self.index,
                           sex=self.sex,
                           room=None)
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
    rally = None

    def setUp(self):
        self.rally = Rally(name='Rally1', max_people=100)
        self.rally.save()

    def test_doubled_rally(self):
        rally2 = Rally(name='Rally1', max_people=200)
        self.assertIsNot(self.rally, rally2)
        # Exception is not thrown but number of rallies stays the same
        rally2.save()
        self.assertEqual(1, len(Rally.objects.all()))

    def test_rally_with_minus_attendance(self):
        self.assertRaises(IntegrityError, Rally('Rally2', max_people=-100).save)

    def test_deletion(self):
        for i in range(100):
            Room(rally=self.rally,
                 number=i).save()
            Student(username=str(i),
                    rally=self.rally,
                    index=str(i),
                    sex='M',
                    room=None).save()
        new_rally = Rally(name='Rally2', max_people=120)
        new_rally.save()
        for i in range(100, 120):
            Room(rally=new_rally,
                 number=i).save()
            Student(username=str(i),
                    rally=new_rally,
                    index=str(i),
                    sex='M',
                    room=None).save()
        self.rally.delete()
        self.assertEqual(20, len(Student.objects.all()))
        self.assertEqual(20, len(Room.objects.all()))


