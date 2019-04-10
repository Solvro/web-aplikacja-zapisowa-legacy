from django.core.mail import send_mail


STUDENT_MAIL_SUBJECT = "Zapisy na rajd {trip}"

STUDENT_MAIL_TEMPLATE = """
Witaj, {index}!\n
Twoje konto jest juz gotowe!\n
Rejestracja do pokoi na rajd {trip} będzie wkrótce możliwa!\n
Oto twoje dane do logowania:\n
Login: {login}\n
Hasło: {password}\n
Strona: <podać adres>\n
Powodzenia przy rejestracji ;-)\n\n
Wiadomość została wygenerowana automatycznie. Prosimy na nią nie odpowiadać.\n
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
        subject = STUDENT_MAIL_SUBJECT.format(trip=event.name)
        body = STUDENT_MAIL_TEMPLATE.format(
            index=index,
            trip=event.name,
            login=username,
            password=password
        )
        student_mail = '{}@student.pwr.edu.pl'.format(index)

        super().__init__(subject, body, "rajdy@pwr.edu.pl", student_mail)