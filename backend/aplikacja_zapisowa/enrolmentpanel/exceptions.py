from django.core.exceptions import FieldError

from rest_framework.exceptions import APIException


class NotPositiveNumberOfPeople(FieldError):
    pass

class CSVError(APIException):
    status_code = 400
    default_code = "bad_request"
    default_detail = ""

class CSVEncodingError(CSVError):
    default_detail = "Kodowanie pliku ze studentami nie jest w 'utf-8 w pliku csv"

class CSVNoHeaderError(CSVError):
    def __init__(self, line_no=1, wrong_data=None):
        self.detail = f"Brak lub błąd nagłówka z nazwami kolumn w pliku csv. Linia: {line_no}"
        if wrong_data is not None:
            self.detail += f", błąd: {wrong_data}"
        super().__init__(self)

class CSVColumnHeaderError(CSVError):
    def __init__(self, column):
        self.detail = f"Brak kolumny: {column}"
        super().__init__(self)

class CSVInvalidDataError(CSVError):
    def __init__(self, line_no, wrong_data=None):
        self.detail = f"Niepoprawnie sformatowane dane w pliku csv. Linia: {line_no} "
        if wrong_data is not None:
            self.detail += f", błąd: {wrong_data}"
        super().__init__(self)
