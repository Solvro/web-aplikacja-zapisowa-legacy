#!/bin/sh

echo "Building frontend images..."
docker build -t builder-1 frontend-user
docker build -t builder-2 frontend-admin
echo "Creating production builds of apps..."
docker run -v "$PWD/build/user:/app/build" builder-1 bash -c "npm run build"
docker run -v "$PWD/build/admin:/app/build" builder-2 bash -c "npm run build"
echo "Deploying frontend apps..."
rsync -av --delete -e ssh build/user/ treter@51.38.135.139:/var/www/html/user/
rsync -av --delete -e ssh build/admin/ treter@51.38.135.139:/var/www/html/admin/