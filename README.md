# Aplikacja zapisowa

## 1. Run app in development environment
In order to run application for development purposes you need to isntall `docker` and `docker-compose`, all tutorials you need are located on [docker website](https://docs.docker.com/install/).

Then you just need to type into terminal:
```
docker-compose up
```
And then you have your development react site under `localhost:3000` and backend API avaliable under `localhost:800`.

## Warning

If you're running backend for the first time, you'll need to apply all migrations first. In order to do so, type following commands:
```
docker exec -ti aplikacja-zapisowa_backend_1 bash
```
Then inside of container execute:
```
python manage.py migrate enrolmentpanel
```
Then all migrations should be applied ;)