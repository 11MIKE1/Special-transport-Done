#!/bin/sh

celery -A config inspect ping || exit 1