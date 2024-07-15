FROM python:3.9-buster

RUN apt-get update && \
    apt-get -y install gcc mono-mcs && \
    rm -rf /var/lib/apt/lists/*

ENV DEBUG 1
RUN mkdir /app
COPY ./requirements.txt /app/
COPY ./aplikacja_zapisowa /app/
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install -r ./requirements.txt

CMD ["daphne", "-p", "8000", "-b", "0.0.0.0", "aplikacja_zapisowa.asgi:application"]
