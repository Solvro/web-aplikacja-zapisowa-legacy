from django.core.exceptions import FieldError

from rest_framework.exceptions import APIException

import re


class NotPositiveNumberOfPeople(FieldError):
    pass

class CSVError(APIException):
    status_code = 400
    default_code = "bad_request"
    default_detail = ""
    code = ""


class CSVEncodingError(CSVError):
    code = "encoding"
    default_detail = "Kodowanie pliku ze studentami nie jest w 'utf-8 w pliku csv"


class CSVNoHeaderError(CSVError):
    code = "required"
    def __init__(self, line_no=1, wrong_data=None):
        self.detail = f"Brak lub błąd nagłówka z nazwami kolumn w pliku csv. Linia: {line_no}"
        if wrong_data is not None:
            self.detail += f", błąd: {wrong_data}"
        super().__init__(self)


class CSVUniqueColumnError(CSVError):
    code = "unique"
    def __init__(self, line_no=1, wrong_data=None):
        unique_constrain = re.search(r'\"(.*)\"', wrong_data)
        # get name of column which is in unique constraint
        column = unique_constrain.group(1).split("_")[:-2]
        # put name of the column in human readable version
        self.detail = f"Wartości w kolumnie {'_'.join(column)} nie są unikalne."
        super().__init__(self)


class CSVInvalidDataError(CSVError):
    code = "invalid"
    def __init__(self, line_no=1, wrong_data=None):
        self.detail = f"Niepoprawnie sformatowane dane w pliku csv. Linia: {line_no} "
        if wrong_data is not None:
            self.detail += f", błąd: {wrong_data}"
        super().__init__(self)


class CSVErrorManager:
    csv_errors = {}

    @classmethod
    def __add_error(cls, code, error_class):
        cls.csv_errors[code] = error_class

    @classmethod
    def create_error(cls, line_no, code, error_message):
        error = cls.csv_errors.get(code)
        if error is None:
            for error in CSVError.__subclasses__():
                if error.code == code:
                    cls.__add_error(code=error.code, error_class=error)
                    return error(line_no, error_message)
        return error(line_no, error_message)

    @staticmethod
    def unpack_details(traceback):
        for index, error in enumerate(traceback):
            for column, details in error.items():
                return index + 2, details[0].code, column


class UniqueEventNameError(APIException):
    default_code = 400
    default_detail = "Już istnieje event o tej nazwie"
