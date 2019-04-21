version: "3"
services:
    backend:
      image: "registry.gitlab.com/solvro/aplikacja-zapisowa/backend:latest"
      build: "./backend"
      ports:
          - "8000:8000"
      depends_on:
          - "db"
          - "redis"
      volumes:
          - "/var/www/static:/app/enrolmentpanel/static"
      environment:
          - ENVIROMENT=PROD
          - DEBUG=0
          - SENTRY_URL=<SENTRY_URL>
          - STATSD_HOST=<STATSD_HOST>
          - STATSD_PORT=<STATSD_PORT>
          - STATSD_PREFIX=<STATSD_PREFIX>
          - SECRET_KEY=<SECRET_KEY>
          - SENDGRID_PASSWORD=<SENDGRID_PASSWORD>
    db:
      image: "postgres:latest"
      volumes:
          - "dbdata:/var/lib/postgresql/data"
    redis:
      image: "redis:5-alpine"

volumes:
  dbdata: