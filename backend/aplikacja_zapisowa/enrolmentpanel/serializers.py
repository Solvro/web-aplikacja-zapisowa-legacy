from django.core.files import File

from rest_framework import serializers

from enrolmentpanel.exceptions import (
    CSVEncodingError,
    CSVNoHeaderError,
    CSVInvalidDataError,
    CSVColumnHeaderError
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
import re
import logging

logger = logging.getLogger(__name__)

class RoomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Room
        fields = ("pk", "number", "max_capacity", "cur_capacity")


class PartialRoomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Room
        fields = ("number", "vacancies")


class StudentSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Student.objects.create(**validated_data)

    def validate_index(self, value):
        if re.fullmatch(r"^\d+$", value):
            return value
        raise serializers.ValidationError("Index contains not digit character")

    class Meta:
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

    def get_image_link(self, obj):
        """
        Gets image's absolute uri
        """
        if obj.image.name:
            image_url = obj.image.url
            return f"localhost:8000/static/images/{image_url}"
        return None

    def validate_participants(self, participants):
        has_header = csv.Sniffer().has_header(str(participants.read(1024)))
        participants.seek(0)
        if not has_header:
            raise CSVNoHeaderError()
        try:
            csv_reader = csv.DictReader(codecs.iterdecode(participants, 'utf-8'))
        except UnicodeEncodeError:
            raise CSVEncodingError()
        return csv_reader

    def create(self, validated_data):
        organizer = Organiser.objects.get(user=self.context.get('user'))
        participants_data = validated_data.pop('participants')
        event = Event.objects.create(organizer=organizer, **validated_data)
        participants_list = []

        try:
            for line_no, participant in enumerate(participants_data):
                participants_list.append(Student(event=event, **participant))
            Student.objects.bulk_create(participants_list)

        except ValueError as e:
            wrong_data = e.__str__().split()[-1]
            raise CSVInvalidDataError(line_no=line_no, wrong_data=wrong_data)

        except TypeError as e:
            if 'literal' in e.__str__():
                wrong_data = e.__str__().split()[-1]
                raise CSVInvalidDataError(line_no=line_no, wrong_data=wrong_data)
            wrong_data = e.__str__().split()[0]
            raise CSVNoHeaderError(line_no=line_no, wrong_data=wrong_data)

        except IntegrityError as e:
            column = re.search(r'\"(.*)\"', e.__str__())
            raise CSVColumnHeaderError(column=column.group(1))

        return event

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
                  "participants")
        read_only_fields = ("image_link", )
        extra_kwargs = {'image': {'write_only': True},
                        'participants': {'write_only': True}}

