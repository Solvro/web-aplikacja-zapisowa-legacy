from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db import models


# NOTE consider using indexes in models
class Rally(models.Model):
    name = models.CharField(max_length=150, primary_key=True)
    max_people = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        if self.max_people > 0:
            super().save(*args, **kwargs)

# def create_rally(rally_name):
#     rally_name = '_'.join(rally_name.split())
#
#     class MyRallyMetaClass(ModelBase):
#         def __new__(mcs, name, bases, attrs):
#             name += rally_name
#             return ModelBase.__new__(mcs, name, bases, attrs)
#
#     class MyRally(models.Model):
#         name = models.CharField(max_length=150, primary_key=True)
#         max_people = models.PositiveIntegerField()
#         __metaclass__ = MyRallyMetaClass
#
#         class Meta:
#             db_table = rally_name
#
#     return MyRally


class Room(models.Model):
    number = models.IntegerField()
    rally = models.ForeignKey(Rally, on_delete=models.CASCADE)
    max_capacity = models.PositiveSmallIntegerField(default=0)

    class Meta:
        unique_together = (('rally', 'number'),)

    def save(self, *args, **kwargs):
        if self.max_capacity > 0:
            super().save(*args, **kwargs)

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
    rally = models.ForeignKey(Rally, on_delete=models.CASCADE)
    index = models.CharField(max_length=30)
    sex = models.CharField(max_length=1,
                           choices=SEX_CHOICES)
    room = models.ForeignKey(Room,
                             default=None,
                             null=True,
                             on_delete=models.SET_NULL)

    class Meta:
        unique_together = (('rally', 'index'),)

    def save(self, *args, **kwargs):
        self.username = self.generate_login()
        # add index to ensure being unique
        self.set_password(raw_password=self.generate_pass())
        # NOTE add sending emails
        super().save(*args, **kwargs)

    def generate_login(self):
        """
        Generates login from index and random 5 sign
        from [2-9a-hjk-n-p-zA-HJ-Z]
        :return: username
        """
        username = self.index + Student.objects.make_random_password(5)
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
