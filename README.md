# Aplikacja zapisowa

## 1. Run app in development environment
In order to run application for development purposes you need to isntall `docker` and `docker-compose`, all tutorials you need are located on [docker website](https://docs.docker.com/install/).

Then you just need to type into terminal:
```
docker-compose up
```
And then you have your development react site under `localhost:3000` and backend API avaliable under `localhost:800`.

## Prepare DB for working

In order to boostrap db with predefinied models, you just need to:
```
$ ./boostrap.sh
```
While `docker` is running.
All info and data about users should be printed to your `stdout`