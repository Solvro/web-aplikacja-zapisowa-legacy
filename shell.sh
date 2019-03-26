#!/bin/sh

echo "Starting shell..."
docker exec -it aplikacja-zapisowa_backend_1 bash -c "python manage.py shell -i ipython"