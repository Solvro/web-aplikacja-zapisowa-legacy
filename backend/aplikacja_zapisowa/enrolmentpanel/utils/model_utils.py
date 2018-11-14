from django.conf import settings
from enrolmentpanel.models import (
    Student,
    User
)
from enrolmentpanel.utils.email_utils import StudentRegisterMail

def generate_student_credentials(index):
    """
    Generates login from index and random 5 sign
    from [2-9a-hjk-n-p-zA-HJ-Z]
    :return: username
    """
    username = index + '_' + User.objects.make_random_password(5)
    password = index + User.objects.make_random_password()
    return username, password


def create_student_user(username, password):
    user = User.objects.create_user(
        username=username,
        password=password
    )
    user.is_participant = True
    user.save()
    return user


def create_new_student(index, event, sex, name, faculty):
    username, password = generate_student_credentials(index)
    student_user = create_student_user(username, password)

    new_student = Student(
        user=student_user,
        event=event,
        index=index,
        sex=sex,
        name=name,
        faculty=faculty
    )

    new_student.save()
    mail = StudentRegisterMail(event, index, username, password)
    mail.send_email()

    if settings.DEBUG:
        return (username, password)
