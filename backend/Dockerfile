FROM python:3.6.6-slim-stretch

RUN apt-get update && \
    apt-get -y install gcc mono-mcs && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /app
COPY ./requirments.txt /app/
COPY ./aplikacja_zapisowa /app/
WORKDIR /app
RUN pip install -r ./requirments.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]