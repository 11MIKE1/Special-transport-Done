#!/bin/sh

until cd /app
do
  echo 'Waiting'
done

until ./src/manage.py makemigrations
      ./src/manage.py migrate
do
  echo 'Waiting DB'
  sleep 2
done

./src/manage.py collectstatic --noinput

gunicorn config.wsgi --bind 0.0.0.0:8080 --workers 4 --threads 4