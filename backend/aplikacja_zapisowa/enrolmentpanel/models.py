from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db import models


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
    index = models.CharField(max_length=30)
    sex = models.CharField(max_length=1,
                           choices=SEX_CHOICES)
    room = models.ForeignKey(Room, null=True, on_delete=models.SET_NULL)

    def save(self, *args, **kwargs):
        self.username = self.generate_login()
        # add index to ensure being unique
        self.set_password(raw_password=self.generate_pass())
        # send_mail(f"Here is your password {kwargs['index'] + password}",
        #           'mati.walczak997@gmail.com',
        #           [kwargs['email']],
        #           fail_silently=False)
        super().save(*args, **kwargs)

    def generate_login(self):
        """
        Generates login from index and random 5 sign
        from [2-9a-hjk-n-p-zA-HJ-Z]
        :return: username
        """
        # can be annoying
        # NOTE think about other way
        username = self.index + Student.objects.make_random_password(5)
        print(f'Username: {username}', end=' ')
        return username

    def generate_pass(self):
        """
        Generates password from index and random 10 sign
        from [2-9a-hjk-n-p-zA-HJ-Z]
        :return: password
        """
        # potentially vulnerable
        password = self.index + Student.objects.make_random_password()
        print(f'Pass: {password}')
        return password
