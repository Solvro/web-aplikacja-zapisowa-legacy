#!/bin/sh
echo "Loging to Gitlab Registry..."
docker login registry.gitlab.com
echo "Generating production compose..."
python3 config_updater.py
echo "Building backend images..."
docker-compose -f prod-compose.yml -p enrolmentpanel build --no-cache
echo "Pushing backend images to registry..."
docker-compose -f prod-compose.yml -p enrolmentpanel push
