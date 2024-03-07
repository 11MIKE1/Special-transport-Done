from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError


def custom_exception_handler(exc, context):
    if isinstance(exc, ValidationError):
        return Response({"detail": exc.detail}, status=status.HTTP_400_BAD_REQUEST)
    
    response = exception_handler(exc, context)

    return response
