from django.contrib import admin
from .models import Student, Organiser, User, Event, Room


# Register your models here.
admin.site.register([Student, Organiser, User, Event, Room])