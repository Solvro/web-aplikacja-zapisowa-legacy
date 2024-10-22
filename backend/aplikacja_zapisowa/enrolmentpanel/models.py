from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.core.files.storage import FileSystemStorage
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver


from enrolmentpanel.exceptions import (
    NotPositiveNumberOfPeople,
    RoomAlreadyFullException,
)
from enrolmentpanel.utils.email_utils import StudentRegisterMail

import os


fs = FileSystemStorage(location=os.path.join(os.getcwd(), 'enrolmentpanel/static/images'))


class User(AbstractUser):
    is_participant = models.BooleanField(default=False)
    is_organiser = models.BooleanField(default=False)


class OrganiserManager(models.Manager):

    def create(self, username, password, faculty, name):
        organiser_user = User.objects.create_user(
            username=username,
            password=password
        )
        organiser_user.is_organiser = True
        organiser_user.save()
        organiser = Organiser(
            faculty=faculty,
            user=organiser_user,
            name=name
        )
        organiser.save()
        return organiser


class Organiser(models.Model):
    objects = OrganiserManager()

    faculty = models.PositiveSmallIntegerField()
    name = models.CharField(max_length=30)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='organiser')

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
    is_active = models.BooleanField(default=False)


class Room(models.Model):
    number = models.CharField(max_length=30)
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
        if len(people) > self.vacancies:
            raise RoomAlreadyFullException(self)
        
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

    def bulk_create(self, objs, is_active=False, batch_size=None):
        users = []
        passwords = []
        for student in objs:
            username, password = self.generate_student_credentials(student.index)
            passwords.append(password)
            user = User(username=username,
                        password=make_password(password),
                        is_participant=True,
                        is_active=is_active)
            users.append(user)
        saved_users = User.objects.bulk_create(users)
        for student, user in zip(objs, saved_users):
            student.user = user
            student.status = 'N'
            if student.email is None:
                student.email = f"{student.index}@student.pwr.edu.pl"

        saved_students = super().bulk_create(objs, batch_size=batch_size)
        for student, password in zip(objs, passwords):
            mail = StudentRegisterMail(student.event, student, password)
            mail.send_email()
        return saved_students



    def create(self, index, event, sex, name, faculty, is_active=False, email=None):
        if email is None:
            email = f"{index}@student.pwr.edu.pl"
        username, password = StudentManager.generate_student_credentials(index)
        student_user = User.objects.create_user(
            username=username,
            password=password,
            is_participant = True,
            is_active=is_active)
        student_user.save()

        new_student = Student(
            user=student_user,
            event=event,
            index=index,
            sex=sex,
            name=name,
            faculty=faculty,
            status='N',
            email=email
        )

        new_student.save()
        mail = StudentRegisterMail(event, new_student, password)
        mail.send_email()

        # for development purposes
        if settings.DEBUG:
            return new_student, username, password

        return new_student

    @staticmethod
    def generate_student_credentials(index):
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
    STATUS_CHOICES = (
        ('N', 'Not registered'),
        ('S', 'Solo registered'),
        ('G', 'Group registered'),
    )
    objects = StudentManager()

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='participant')
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    index = models.CharField(max_length=30)
    faculty = models.PositiveSmallIntegerField()
    sex = models.CharField(
        max_length=1,
        choices=SEX_CHOICES
    )
    status = models.CharField(
        default='N',
        max_length=1,
        choices=STATUS_CHOICES
    )
    room = models.ForeignKey(Room,
                             default=None,
                             null=True,
                             on_delete=models.SET_NULL)
    email = models.EmailField(default=None)

    class Meta:
        unique_together = (('index', 'event'),)


@receiver(post_delete, sender=Student)
def auto_delete_user_with_Student(sender, instance, **kwargs):
    instance.user.delete()

@receiver(post_delete, sender=Organiser)
def auto_delete_user_with_Organiser(sender, instance, **kwargs):
    instance.user.delete()
