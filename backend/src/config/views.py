from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse, HttpRequest
from django.db import connections
from django.db.utils import OperationalError
from django.core.cache import cache
from django.core.cache.backends.base import BaseCache
import logging
import os

logger = logging.getLogger(__name__)


class API(APIView):
    def get(self, request):
        return Response(
            {
                "company_info": f"http://{request.get_host()}/api/company_info/",
                "galeries": f"http://{request.get_host()}/api/galeries/",
                "online_cources": f"http://{request.get_host()}/api/online_cources/",
                "questions": f"http://{request.get_host()}/api/questions/",
                "users": f"http://{request.get_host()}/api/users/",
                "video_cources": f"http://{request.get_host()}/api/video_cources/",
            }
        )


class MainAPI(APIView):
    def get(self, request):
        return Response(
            {
                'api': f'http://{request.get_host()}/api/',
                'admin': f'http://{request.get_host()}/admin/',
            }
        )


def check_database_connection() -> bool:
    try:
        db_conn = connections['default']
        db_conn.cursor()
    except OperationalError:
        return False
    return True


def check_cache_connection() -> bool:
    try:
        cache.set('health_check', 'ok', timeout=5)
        return cache.get('health_check') == 'ok'
    except BaseCache:
        return False


def check_filesystem_write() -> bool:
    try:
        with open('/app/src/tmp/health_check', 'w') as text_file:
            text_file.write('ok')
        os.remove('/app/src/tmp/health_check')
        return True
    except IOError as e:
        logger.error(f"Filesystem write check failed: {e}")
        return False


def health_check(request: HttpRequest) -> JsonResponse:
    if not check_database_connection():
        return JsonResponse(
            {
                'status': 'unhealthy',
                'reason': 'Database connection failed'
            },
            status=500
        )
    if not check_cache_connection():
        return JsonResponse(
            {
                'status': 'unhealthy',
                'reason': 'Cache connection failed'
            },
            status=500
        )
    if not check_filesystem_write():
        return JsonResponse(
            {
                'status': 'unhealthy',
                'reason': 'Filesystem write failed'
            },
            status=500
        )
    return JsonResponse(
        {
            'status': 'healthy'
        },
        status=200
    )
