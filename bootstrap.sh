#!/bin/sh

echo "Flushing db..."
docker exec -t  web-aplikacja-zapisowa-legacy-backend-1 bash -c "python manage.py flush --no-input"
echo "Applying migrations..."
docker exec -t  web-aplikacja-zapisowa-legacy-backend-1 bash -c "python manage.py migrate"
echo "Bootstraping database..."
docker exec -t  web-aplikacja-zapisowa-legacy-backend-1 bash -c "python manage.py initialize_db"