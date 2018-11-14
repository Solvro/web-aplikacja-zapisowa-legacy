from django.core.mail import send_mail


STUDENT_MAIL_SUBJECT = "Witaj {index}! Twoje konto jest juz gotowe!"

STUDENT_MAIL_TEMPLATE = """
Witaj, {index} rejestracja do pokoi na rajd {trip} będzie wkrótce mozliwa:
Oto twoje dane logowanie:
Login: {login}
Hasło: {password}
Powodzenia przy rejestracji ;-)
"""


class BasicMail(object):
    
    def __init__(self, subject, body, sender, receiver):
        self.subject = subject
        self.body = body
        self.sender = sender
        self.receiver = receiver

    def send_email(self):
        send_mail(
            self.subject,
            self.body,
            self.sender,
            [self.receiver]
        )


class StudentRegisterMail(BasicMail):

    def __init__(self, event, index, username, password):
        subject = STUDENT_MAIL_SUBJECT.format(index=index)
        body = STUDENT_MAIL_TEMPLATE.format(
            index=index,
            trip=event.name,
            login=username,
            password=password
        )
        student_mail = '{}@student.pwr.edu.pl'.format(index)

        super().__init__(subject, body, "rajdy@pwr.edu.pl", student_mail)