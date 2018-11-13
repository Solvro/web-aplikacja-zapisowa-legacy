from django.contrib.auth.models import AbstractUser
from django.db import models
from .exceptions import NotPositiveNumberOfPeople


class User(AbstractUser):
    is_participant = models.BooleanField(default=False)
    is_organiser = models.BooleanField(default=False)


class Organiser(models.Model):
    faculty = models.PositiveSmallIntegerField()
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='organiser')

    def delete(self, *args, **kwargs):
        self.user.delete()
        return super().delete(*args, **kwargs)


class Event(models.Model):
    name = models.CharField(max_length=150, primary_key=True)
    max_people = models.PositiveIntegerField()
    organizer = models.ForeignKey(Organiser, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self.max_people > 0:
            super().save(*args, **kwargs)
        else:
            raise NotPositiveNumberOfPeople


class Room(models.Model):
    number = models.IntegerField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    max_capacity = models.PositiveSmallIntegerField(default=0)
    cur_capacity = models.PositiveSmallIntegerField(default=0)
    vacancies = models.PositiveSmallIntegerField(default=0)

    class Meta:
        unique_together = (('event', 'number'),)

    def save(self, *args, **kwargs):
        if self.max_capacity > 0:
            super().save(*args, **kwargs)
        else:
            raise NotPositiveNumberOfPeople

        self.vacancies = self.max_capacity - self.cur_capacity

    def add_people(self, people):
        """
        Updates room field in models
        given in people
        :param people: list-like object with models
        """
        # probably will be modified
        needed_people = self.max_capacity - Student.objects.filter(room=self).count()
        if len(people) <= needed_people:
            for person in people:
                person.room = self
                person.save()
            self.cur_capacity += len(people)
            self.save()

    def remove_person(self, student):
        student.room = None
        student.save()
        self.cur_capacity -= 1
        self.save()


class Student(models.Model):
    SEX_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

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
