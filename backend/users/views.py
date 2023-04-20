from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .backends import PhoneBackend


@method_decorator(csrf_exempt, name='dispatch')
class TokenCreateByPhoneView(APIView):
    def post(self, request):
        phone = request.data.get('phone')
        password = request.data.get('password')

        if phone is None or password is None:
            return Response(
                {'message': _('Телефон и пароль являются '
                              'обязательными полями')},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(
            request,
            phone=phone,
            password=password,
            backend=PhoneBackend()
        )

        if not user:
            return Response({'message': _('Неверный телефон или пароль.')},
                            status=status.HTTP_401_UNAUTHORIZED)

        token, created = Token.objects.get_or_create(user=user)

        return Response({'auth_token': token.key})


@api_view(['POST'])
def send_email(request):
    description = request.data.get('description', '')
    first_name = request.data.get('first_name', '')
    phone = request.data.get('phone', '')

    if not description or not first_name or not phone:
        return Response({'error': 'Отсутствуют обязательные поля'},
                        status=status.HTTP_400_BAD_REQUEST)

    message = f"Заявка от {first_name} ({phone}):\n\n{description}"
    send_mail(
        'Новая заявка',
        message,
        'academy@frantsuz.ru',
        ['academy@frantsuz.ru'],
        fail_silently=False,
    )

    return Response({'success': 'Сообщение успешно отправлено'})
