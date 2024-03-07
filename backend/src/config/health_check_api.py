from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .views import (
    check_filesystem_write,
    check_cache_connection,
    check_database_connection
)


class HealthCheckAPI(APIView):
    def get(self, request):
        database_ok = check_database_connection()
        cache_ok = check_cache_connection()
        filesystem_ok = check_filesystem_write()

        health_check_status = {
            'database': 'ok' if database_ok else 'unhealthy',
            'cache': 'ok' if cache_ok else 'unhealthy',
            'filesystem': 'ok' if filesystem_ok else 'unhealthy'
        }

        if all([database_ok, cache_ok, filesystem_ok]):
            return Response(health_check_status)
        else:
            return Response(health_check_status, status=status.HTTP_500_INTERNAL_SERVER_ERROR)