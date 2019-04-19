from datetime import datetime

ROOMS = [
    {
        "number": 1,
        "max_capacity": 2
    },
        {
        "number": 2,
        "max_capacity": 4
    },
        {
        "number": 3,
        "max_capacity": 8
    }
]

EVENT = {
    "name": "testowy",
    "description": "jakis testowy event",
    "beginning_date": datetime.now(),
    "ending_date": datetime(2069, 1, 1)
}

USERS = [
    {
        "index": "1",
        "sex": "M",
        "name": "Jan Bibrowski",
        "faculty": 11,
        "email": "ruchy@kluchy.com"
    },
    {
        "index": "2",
        "sex": "F",
        "name": "Maciej Dziadyknik",
        "faculty": 11
    },
    {
        "index": "3",
        "sex": "M",
        "name": "Adrjan Klucha",
        "faculty": 6
    },
    {
        "index": "69",
        "sex": "M",
        "name": "Macieg Kabolo",
        "faculty": 9
    },
]

ORGANISER = {
    "username": "test_org",
    "password": "test1234",
    "faculty": 11,
    "name": "Bateusz Rastrowy"
}