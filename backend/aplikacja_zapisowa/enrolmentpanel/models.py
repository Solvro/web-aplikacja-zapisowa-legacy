from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.db import models

from enrolmentpanel.exceptions import NotPositiveNumberOfPeople
from enrolmentpanel.utils.email_utils import StudentRegisterMail

import os


fs = FileSystemStorage(location=os.path.join(os.getcwd(), 'enrolmentpanel/static/images'))


class User(AbstractUser):
    is_participant = models.BooleanField(default=False)
    is_organiser = models.BooleanField(default=False)


class OrganiserManager(models.Manager):

    def create(self, username, password, faculty):
        organiser_user = User.objects.create_user(
            username=username,
            password=password
        )
        organiser_user.is_organiser = True
        organiser_user.save()
        organiser = Organiser(faculty=faculty, user=organiser_user)
        organiser.save()
        return organiser


class Organiser(models.Model):
    objects = OrganiserManager()

    faculty = models.PositiveSmallIntegerField()
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='organiser')

    def delete(self, *args, **kwargs):
        self.user.delete()
        return super().delete(*args, **kwargs)

    def __str__(self):
        return self.user.__str__()


class Event(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    description = models.CharField(max_length=120)
    place = models.TextField(default=None, null=True)
    accommodation = models.TextField(default=None, null=True)
    image = models.ImageField(default=None, null=True, storage=fs)
    beginning_date = models.DateField(null=False)
    ending_date = models.DateField(null=False)
    organizer = models.ForeignKey(Organiser, on_delete=models.CASCADE)


    
class Room(models.Model):
    number = models.IntegerField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    max_capacity = models.PositiveSmallIntegerField(default=0)
    cur_capacity = models.PositiveSmallIntegerField(default=0)
    vacancies = models.PositiveSmallIntegerField(default=0)

    class Meta:
        unique_together = (('event', 'number'),)

    def save(self, *args, **kwargs):
        self.vacancies = self.max_capacity - self.cur_capacity
        if self.max_capacity > 0:
            super().save(*args, **kwargs)
        else:
            raise NotPositiveNumberOfPeople


    def add_people(self, people):
        """
        Updates room field in models
        given in people
        :param people: list-like object with models
        """
        # probably will be modified
        needed_people = self.max_capacity - Student.objects.filter(room=self).count()
        if len(people) <= needed_people:
            self.cur_capacity += len(people)

            for person in people:
                person.room = self
                person.save()

            self.save()

    def remove_person(self, student):
        student.room = None
        student.save()
        self.cur_capacity -= 1
        self.save()


class StudentManager(models.Manager):

    def bulk_create(self, objs, batch_size=None):
        users = []
        for student in objs:
            username, password = self.__generate_student_credentials(student.index)
            user = User(username=username, password=password, is_participant=True)
            users.append(user)
        saved_users = User.objects.bulk_create(users)
        for student, user in zip(objs, saved_users):
            student.user = user
        super().bulk_create(objs, batch_size=batch_size)


    def create(self, index, event, sex, name, faculty):
        username, password = self.__generate_student_credentials(index)
        student_user = User.objects.create_user(
            username=username,
            password=password
        )
        student_user.is_participant = True
        student_user.save()

        new_student = Student(
            user=student_user,
            event=event,
            index=index,
            sex=sex,
            name=name,
            faculty=faculty
        )

        new_student.save()
        mail = StudentRegisterMail(event, index, username, password)
        mail.send_email()

        # for development purposes
        if settings.DEBUG:
            return new_student, username, password

        return new_student

    def __generate_student_credentials(self, index):
        """
        Generates login from index and random 5 sign
        from [2-9a-hjk-n-p-zA-HJ-Z]
        :return: username
        """
        username = index + '_' + User.objects.make_random_password(5)
        password = index + User.objects.make_random_password()
        return username, password


class Student(models.Model):
    SEX_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    objects = StudentManager()

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='participant')
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    index = models.CharField(max_length=30)
    faculty = models.PositiveSmallIntegerField()
    sex = models.CharField(max_length=1,
                           choices=SEX_CHOICES)
    room = models.ForeignKey(Room,
                             default=None,
                             null=True,
                             on_delete=models.SET_NULL)

    class Meta:
        unique_together = (('index', 'event'),)

    def delete(self, *args, **kwargs):
        self.user.delete()
        return super().delete(*args, **kwargs)
