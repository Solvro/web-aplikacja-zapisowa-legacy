from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.core.mail import send_mail


# NOTE consider using indexes in models
class Rally(models.Model):
    name = models.CharField(max_length=150, primary_key=True)
    max_people = models.PositiveIntegerField()


class Room(models.Model):
    number = models.IntegerField(primary_key=True)
    rally = models.ForeignKey(Rally, on_delete=models.CASCADE)


class Student(AbstractUser):
    SEX_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    # rally is needed because we create user only for one rally
    # but one student can be registered for several
    # also enables deletion with the rally
    rally = models.ForeignKey(Rally, on_delete=models.CASCADE)
    # ask if it has to be unique think about login
    index = models.CharField(max_length=30, unique=True)
    sex = models.CharField(max_length=1,
                           choices=SEX_CHOICES)
    room = models.ForeignKey(Room, null=True, on_delete=models.SET_NULL)

    def save(self, *args, **kwargs):
        password = Student.objects.make_random_password()
        # add index to ensure being unique
        self.set_password(raw_password=self.index + password)
        # send_mail(f"Here is your password {kwargs['index'] + password}",
        #           'mati.walczak997@gmail.com',
        #           [kwargs['email']],
        #           fail_silently=False)
        super().save(*args, **kwargs)
