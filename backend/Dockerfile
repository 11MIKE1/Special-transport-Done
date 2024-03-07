FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE 1  #  Эта переменная окружения указывает Python не записывать .pyc
ENV PYTHONUNBUFFERED 1  # Это гарантирует, что вывод из Python будет выводиться в консоль без задержек
ENV PYTHONPATH="${PYTHONPATH}:/app/src"


WORKDIR /app

COPY requirements.txt .
ADD wsgi-entrypoint.sh .

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    python3 -m pip install --upgrade pip && \
    pip install -r requirements.txt && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY src/ /app/

COPY src/config/celery_health_check.sh /usr/local/bin/celery_health_check.sh
RUN chmod +x /usr/local/bin/celery_health_check.sh

HEALTHCHECK --interval=30s \
            --timeout=30s \
            --start-period=5s \
            --retries=3 \
CMD curl -f http://0.0.0.0:8080/api/healthcheck/ || exit 1