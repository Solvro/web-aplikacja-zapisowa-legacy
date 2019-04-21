FROM python:3.6.6-slim-stretch

RUN apt-get update && \
    apt-get -y install gcc mono-mcs && \
    rm -rf /var/lib/apt/lists/*

ENV DEBUG 1
RUN mkdir /app
COPY ./requirments.txt /app/
COPY ./aplikacja_zapisowa /app/
WORKDIR /app
RUN pip install -r ./requirments.txt

CMD ["daphne", "-p", "8000", "-b", "0.0.0.0", "aplikacja_zapisowa.asgi:application"]