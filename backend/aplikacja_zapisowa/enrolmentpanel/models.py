from django.contrib.auth.models import User
from django.db import models
from .exceptions import NotPositiveNumberOfPeople


class Admin(models.Model):
    faculty = models.PositiveSmallIntegerField()
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='admin')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.user.delete()
        return super().delete(*args, **kwargs)


class Event(models.Model):
    name = models.CharField(max_length=150, primary_key=True)
    max_people = models.PositiveIntegerField()
    organizer = models.ForeignKey(Admin, on_delete=models.CASCADE)

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
        unique_together = (('event', 'number'),)

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


class Student(models.Model):
    SEX_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='user')
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    index = models.CharField(max_length=30)
    sex = models.CharField(max_length=1,
                           choices=SEX_CHOICES)
    room = models.ForeignKey(Room,
                             default=None,
                             null=True,
                             on_delete=models.SET_NULL)

    class Meta:
        unique_together = (('index', 'event'),)

    def save(self, *args, **kwargs):
        self.user = User(username=self.generate_login(), password=self.generate_pass())
        self.user.save()
        self.user_id = self.user.id
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.user.delete()
        return super().delete(*args, **kwargs)

    def generate_login(self):
        """
        Generates login from index and random 5 sign
        from [2-9a-hjk-n-p-zA-HJ-Z]
        :return: username
        """
        username = self.index + '_' + User.objects.make_random_password(5)
        return username

    def generate_pass(self):
        """
        Generates password from index and random 10 sign
        from [2-9a-hjk-n-p-zA-HJ-Z]
        :return: password
        """
        # potentially vulnerable
        password = self.index + User.objects.make_random_password()
        return password
#
# class StudentManager(models.Manager):
#     def create_student(self):


