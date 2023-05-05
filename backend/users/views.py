import json

import requests
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.http import JsonResponse
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


# ШАШЛАНДИЯ ИНФОРМАЦИЯ О ЗАКАЗЕ
@api_view(['POST'])
def send_order(request, id=None):
    response = requests.get(f'https://shashlandia.ru/orders/{id}')
    if response.status_code != 200:
        return JsonResponse({'message': 'Error receiving order'},
                            status=400)
    if request.method != "POST":
        return JsonResponse({'message': 'Only POST requests are supported'},
                            status=405)

    order_data = response.json()
    try:
        user_data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'message': 'Invalid JSON payload'}, status=400)
    first_name = user_data.get('first_name')
    last_name = user_data.get('last_name')
    phone = user_data.get('phone')
    email = user_data.get('email')
    is_delivery = user_data.get('is_delivery')
    order_id = order_data.get('id')
    products = order_data.get('products')
    total_price = order_data.get('total_price')
    date_order = order_data.get('created_at')
    comment = order_data.get('comment')
    if not order_id or not products:
        return JsonResponse(
            {'message': 'Missing required fields in JSON payload'}, status=400)

    order_text = f'Заказ: #{order_id}\nДата заказа: {date_order}\n\n'
    order_text += (f'ИНФОРМАЦИЯ О ЗАКАЗЧИКЕ:\n'
                   f'Имя: {first_name}\n'
                   f'Фамилия: {last_name}\n'
                   f'Номер телефона: {phone}\n'
                   f'Почта: {email}\n')
    order_text += '--------------------------------------\n\n'
    order_text += 'СПОСОБ ДОСТАВКИ:\n'
    if int(is_delivery):
        order_text += 'Доставка по адресу:\n'
        street = order_data.get('street')
        entrance = order_data.get('entrance')
        storey = order_data.get('storey')
        flat = order_data.get('flat')
        order_text += (f'Улица, дом: {street}\n'
                       f'Подъезд: {entrance}\n'
                       f'Этаж: {storey}\n'
                       f'Квартира: {flat}\n')
    else:
        order_text += 'Самовывоз\n'
    order_text += '--------------------------------------\n\n'
    order_text += f'КОММЕНТАРИЙ К ЗАКАЗУ:\n{comment}\n'
    order_text += '--------------------------------------\n\n'
    order_text += 'ТОВАРЫ К ВЫДАЧЕ:\n'
    order_text += '--------------------------------------\n'
    iteration = 0
    for product in products:
        title = product.get('product', {}).get('title')
        count = product.get('count')
        price = product.get('product', {}).get('price')
        weight = product.get('product', {}).get('weight')
        if title and count:
            iteration += 1
            order_text += (f'{iteration}. {title}\n'
                           f'Количество: {count}\n'
                           f'Цена: {price} рублей\n'
                           f'Вес: {weight}\n')
            order_text += '--------------------------------------\n'
    order_text += f'ИТОГОВАЯ СУММА ЗАКАЗА: {total_price} рублей'
    send_mail(
        f'Новый заказ: #{order_id}',
        order_text,
        'academy@frantsuz.ru',
        ['academy@frantsuz.ru'],
        fail_silently=False,
    )
    return JsonResponse({'success': True})
