#!/bin/sh

echo "Launching ws simulator script..."
docker exec -t aplikacja-zapisowa_backend_1 bash -c "python manage.py simulate_ws"