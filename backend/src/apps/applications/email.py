from celery import shared_task
from django.core import mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from .models import Application


@shared_task
def send_msg(application_id):
    """
    Асинхронная задача для отправки электронной почты по завершении создания экземпляра Application.

    Аргументы:
    - application_id: Идентификатор экземпляра Application, для которого отправляется почта.

    Задача извлекает экземпляр Application по его идентификатору,
    формирует сообщение и отправляет его на указанный адрес электронной почты.

    Примечание:
    - Данная задача должна использоваться совместно с Celery для асинхронной обработки.
    - Убедитесь, что Celery Worker запущен для обработки задач.
    """
    # Извлекаем экземпляр Application по идентификатору
    application_instance = Application.objects.get(id=application_id)

    # Формируем данные для отправки почты
    subject = "Ваша заявка принята"
    message = "Спасибо за вашу заявку. Мы свяжемся с вами в ближайшее время."
    to_email = application_instance.email

    # Формируем HTML-сообщение с использованием шаблона и данных экземпляра Application
    html_message = render_to_string('index.html', {'client_name': application_instance.client_name})

    # Отправляем электронное письмо
    mail.send_mail(
        subject,
        strip_tags(html_message),
        settings.EMAIL_HOST_USER,
        [to_email],
        html_message=html_message
    )
