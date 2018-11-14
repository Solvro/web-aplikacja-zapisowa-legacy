from rest_framework import serializers

from enrolmentpanel.models import (
    Room,
    Student
)


class RoomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Room
        fields = ("pk", "number", "max_capacity", "cur_capacity")


class PartialRoomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Room
        fields = ("number", "vacancies")


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('name', 'faculty', 'pk')
