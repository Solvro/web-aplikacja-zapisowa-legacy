from django.core.files import File

from rest_framework import serializers

from enrolmentpanel.models import (
    Room,
    Student,
    Organiser,
    User,
    Event
)

import re
import base64



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

    base64_image = serializers.SerializerMethodField()

    def get_base64_image(self, obj):
        """
        Converts image to base64 when Event is got
        """
        if obj.image.name:
            with open(obj.image.path, 'rb') as f:
                image = File(f)
                data = base64.b64encode(image.read())
            return data
        return "No image"

    def create(self, validated_data):
        organizer = Organiser.objects.get(user=self.context.get('user'))
        return Event.objects.create(organizer=organizer, **validated_data)

    class Meta:
        model = Event
        fields = ("name",
                  "description",
                  "place",
                  "accommodation",
                  "image",
                  "beginning_date",
                  "ending_date",
                  "base64_image")
        extra_kwargs = {'image': {'write_only': True}}
