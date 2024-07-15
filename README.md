# Legacy aplikacja zapisowa
![Screenshot 2024-07-15 at 16.09.11.png](./assets/Screenshot%202024-07-15%20at%2016.09.11.png)
![Screenshot 2024-07-15 at 17.41.25.png](assets%2FScreenshot%202024-07-15%20at%2017.41.25.png)
## About application
The legacy application for signing up for student "rajd" - participation in tourist events for students.
It enables quick and convenient registration, managing the list of participants and tracking information about upcoming "rajds".


## 1. Run app in development environment
In order to run application for development purposes you need to isntall `docker` and `docker-compose`, all tutorials you need are located on [docker website](https://docs.docker.com/install/).

Then you just need to type into terminal:
```
docker-compose up
```
And then you have your development react site under `localhost:3000` and backend API avaliable under `localhost:8000`.

## Prepare DB for working

In order to boostrap db with predefinied models, you just need to:
```
$ ./boostrap.sh
```
While `docker` is running.
All info and data about users should be printed to your `stdout`


## Simualate how WebSockets works

If you want check how WebSockets works you can use `simulation script` which creates test user for event `testowy` and randomly adds and removes user to/from rooms.

Websockets are located under path: `ws://localhost:8000/ws/<event_name>/rooms/`. In order to run simulation you need to run command:
```
$ ./ws-simulator.sh
```
If You want to stop simulation just `CTRL-C` out of script

## 2. Technology used
- React
- Django
- WebSockets
- Docker
- Docker-compose
- PostgreSQL
- Redis

## 3. Authors
Main creator of the application was Matuesz Walczak - founder of the Solvro

## 4. License
Application uses MIT license

## 5. Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.