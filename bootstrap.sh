#!/bin/sh

echo "Flushing db..."
docker exec -t aplikacja-zapisowa_backend_1 bash -c "python manage.py flush --no-input"
echo "Applying migrations..."
docker exec -t aplikacja-zapisowa_backend_1 bash -c "python manage.py migrate"
echo "Bootstraping database..."
docker exec -t aplikacja-zapisowa_backend_1 bash -c "python manage.py initialize_db"