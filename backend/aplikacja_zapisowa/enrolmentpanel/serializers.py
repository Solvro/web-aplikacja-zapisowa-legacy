from django.core.files import File
from django.db import IntegrityError


from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from enrolmentpanel.exceptions import (
    CSVEncodingError,
    CSVNoHeaderError,
    CSVInvalidDataError,
    CSVUniqueColumnError,
    CSVErrorManager
)

from django.db import (
    IntegrityError
)

from enrolmentpanel.models import (
    Room,
    Student,
    Organiser,
    User,
    Event
)

import base64
import codecs
import csv
import os
import re


class RoomListSerializer(serializers.ListSerializer):

    def create(self, validated_data):
        rooms = [Room(**item, event=self.context['event']) for item in validated_data]
        return Room.objects.bulk_create(rooms)


class RoomSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Room.objects.create(**validated_data, event=self.context['event'])
    
    class Meta:
        list_serializer_class = RoomListSerializer
        model = Room
        fields = ("pk", "number", "max_capacity", "cur_capacity")
        read_only_fields = ("pk", "cur_capacity")


class RoomDetailedSerializer(serializers.ModelSerializer):
    sex_division = serializers.SerializerMethodField()

    def get_sex_division(self, obj):
        students = obj.student_set.all()
        if len(students) == 0:
            return "N/A"
        sex_division = students[0].sex
        for student in students[1:]:
            if sex_division != student.sex:
                return "koedukacyjny"

        return ("męski" if sex_division == "M" else "zenski")

    class Meta:
        list_serializer_class = RoomListSerializer
        model = Room
        fields = ("number", "max_capacity", "vacancies", "cur_capacity", "sex_division")
        read_only_fields = ("number", "max_capacity", "vacancies", "cur_capacity", "sex_division")


class PartialRoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ("number", "vacancies", "max_capacity")


class StudentListSerializer(serializers.ListSerializer):

    def create(self, validated_data):
        students = [Student(**item) for item in validated_data]
        return Student.objects.bulk_create(students)


class StudentSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Student.objects.create(**validated_data)

    def validate_index(self, value):
        if re.fullmatch(r"^\d+$", value):
            return value
        raise serializers.ValidationError("Index contains not digit character")

    class Meta:
        list_serializer_class = StudentListSerializer
        model = Student
        fields = ("name", "index", "faculty", "sex", "event")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password")


class OrganiserSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    def create(self, validated_data):
        user = validated_data.pop('user')
        return Organiser.objects.create(user['username'], user['password'], **validated_data)

    class Meta:
        model = Organiser
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):

    image_link = serializers.SerializerMethodField()
    participants = serializers.FileField(write_only=True)
    rooms = serializers.FileField(write_only=True)

    def get_image_link(self, obj):
        """
        Gets image's absolute uri
        """
        if obj.image.name:
            image_url = obj.image.url
            return f"localhost:8000/static/images/{image_url}"
        return None

    def validate_csv_file(self, csv_file):
        has_header = csv.Sniffer().has_header(str(csv_file.read(1024)))
        csv_file.seek(0)
        if not has_header:
            raise CSVNoHeaderError()
        try:
            csv_reader = csv.DictReader(codecs.iterdecode(csv_file, 'utf-8'))
        except UnicodeEncodeError:
            raise CSVEncodingError()
        return list(csv_reader)

    def validate_rooms(self, rooms):
        return self.validate_csv_file(rooms)

    def validate_participants(self, participants):
        return self.validate_csv_file(participants)

    def create_participants(self, participants, event):
        for participant in participants:
                participant['event'] = event.name
        students_serializer = StudentSerializer(data=participants, many=True)
        if students_serializer.is_valid(raise_exception=True):
            students_serializer.save()

    def create_rooms(self, rooms_data, event):
        rooms_serializer = RoomSerializer(data=rooms_data, many=True, context={'event': event})
        if rooms_serializer.is_valid(raise_exception=True):
            rooms_serializer.save()


    def create(self, validated_data):
        organizer = Organiser.objects.get(user=self.context.get('user'))
        participants_data = validated_data.pop('participants')
        rooms_data = validated_data.pop('rooms')
        event = Event.objects.create(organizer=organizer, **validated_data)
        try:
            self.create_participants(participants_data, event)
            self.create_rooms(rooms_data, event)
        except IntegrityError as e:
            raise CSVUniqueColumnError(wrong_data=e.__str__())

        except ValidationError as e:
            index, code, column = CSVErrorManager.unpack_details(e.detail)
            raise CSVErrorManager.create_error(index, code, column)

        return event

    def update(self, instance, validated_data):
        validated_data.pop('name', None)
        if validated_data.get('image') is not None:
            os.remove(os.path.join(os.getcwd(), 'enrolmentpanel/static/images/', str(instance.image)))
        if validated_data.get('participants') is not None:
            Student.objects.filter(event=instance).delete()
            self.create_participants(validated_data.pop('participants'), instance)
        if validated_data.get('rooms') is not None:
            Room.objects.filter(event=instance).delete()
            self.create_rooms(validated_data.pop('rooms'), instance)
        return super().update(instance, validated_data)

    class Meta:
        model = Event
        fields = ("name",
                  "description",
                  "place",
                  "accommodation",
                  "image",
                  "beginning_date",
                  "ending_date",
                  "image_link",
                  "participants",
                  "rooms")
        read_only_fields = ("image_link", )
        extra_kwargs = {'image': {'write_only': True},
                        'participants': {'write_only': True},
                        'rooms': {'write_only': True}}
