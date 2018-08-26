from django.core.exceptions import FieldError


class NotPositiveNumberOfPeople(FieldError):
    pass
