# Aplikacja zapisowa

## 1. Run app in development environment
In order to run application for development purposes you need to isntall `docker` and `docker-compose`, all tutorials you need are located on [docker website](https://docs.docker.com/install/).

Then you just need to type into terminal:
```
docker-compose up
```
And then you have your development react site under `localhost:3000` and backend API avaliable under `localhost:800`.

## Prepare DB for working

In order to work on db, we need one time configuration to create: `Organiser`, `Event`. In order to do so we need to:
```
docker exec -ti aplikacja-zapisowa_backend_1 bash
```
Then inside container:
```
python manage.py shell
```
And then in django shell:
```
from enrolmentpanel.models import (User, Organiser, Event)
u = User.objects.create_user("organizator", "haslo")
u.is_organiser = True
u.save()
o = Organiser(faculty=11, user=u)
o.save()
e = Event(name="rajd_nazwa", max_people=69, organizer=o)
e.save()
```
Now you have your db ready to do some basic stuff.
In order to add new users, ther is special development only endpoint `/api/test/add_user`. You bother it with `POST`, with body as follows:
```
{
	"index": "236368",
	"name": "Jamnik"
}
```

And receive answer as:
```
{
    "username": "236368_4CDtM",
    "password": "2363683j2kWjSVCv"
}
```


## Warning!

If you're running backend for the first time, you'll need to apply all migrations first. In order to do so, type following commands:
```
docker exec -ti aplikacja-zapisowa_backend_1 bash
```
Then inside of container execute:
```
python manage.py migrate enrolmentpanel
```
Then all migrations should be applied ;)