from django.contrib.auth.models import AbstractUser
from django.db import models
from .exceptions import NotPositiveNumberOfPeople


class Event(models.Model):
    name = models.CharField(max_length=150, primary_key=True)
    max_people = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        if self.max_people > 0:
            super().save(*args, **kwargs)
        else:
            raise NotPositiveNumberOfPeople


class Room(models.Model):
    number = models.IntegerField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    max_capacity = models.PositiveSmallIntegerField(default=0)

    class Meta:
        unique_together = (('Event', 'number'),)

    def save(self, *args, **kwargs):
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
            for person in people:
                person.room = self
                person.save()


class Student(AbstractUser):
    SEX_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    index = models.CharField(max_length=30)
    sex = models.CharField(max_length=1,
                           choices=SEX_CHOICES)
    room = models.ForeignKey(Room,
                             default=None,
                             null=True,
                             on_delete=models.SET_NULL)

    class Meta:
        unique_together = (('Event', 'index'),)

    def save(self, *args, **kwargs):
        self.username = self.generate_login()
        self.set_password(raw_password=self.generate_pass())
        super().save(*args, **kwargs)

    def generate_login(self):
        """
        Generates login from index and random 5 sign
        from [2-9a-hjk-n-p-zA-HJ-Z]
        :return: username
        """
        username = self.index + '_' + Student.objects.make_random_password(5)
        return username

    def generate_pass(self):
        """
        Generates password from index and random 10 sign
        from [2-9a-hjk-n-p-zA-HJ-Z]
        :return: password
        """
        # potentially vulnerable
        password = self.index + Student.objects.make_random_password()
        return password
