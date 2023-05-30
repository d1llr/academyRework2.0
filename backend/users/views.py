import datetime
import json
from urllib.parse import urlencode

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
def send_order_shashlandia(request, order_id=None):
    response = requests.get(f'https://shashlandia.ru/orders/{order_id}')
    if response.status_code != 200:
        return JsonResponse({'message': 'Ошибка получения заказа'},
                            status=400)
    if request.method != "POST":
        return JsonResponse({'message': 'Поддерживаются только POST-запросы'},
                            status=405)

    order_data = response.json()
    try:
        user_data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse(
            {'message': 'Неверная полезная нагрузка JSON'},
            status=400
        )
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
            {'message': 'Отсутствуют обязательные поля в полезной нагрузке'},
            status=400
        )

    order_text = (f'ШАШЛАНДИЯ.РФ\n'
                  f'ЗАКАЗ: #{order_id}\n'
                  f'ДАТА ЗАКАЗА: {date_order}\n\n')
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
    payment = user_data.get('payment')
    order_text += '--------------------------------------\n\n'
    if int(payment):
        order_text += 'СПОСОБ ОПЛАТЫ:\nОнлайн на сайте\n'
    else:
        order_text += 'СПОСОБ ОПЛАТЫ:\nОплата при получении\n'
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
        f'Шашландия новый заказ: #{order_id}',
        order_text,
        'academy@frantsuz.ru',
        ['academy@frantsuz.ru', 'dostavka@tyteda.ru'],
        fail_silently=False,
    )
    if int(payment):
        url = "https://3dsec.sberbank.ru/payment/rest/register.do"
        payload = {
            "userName": "t5041214554_230523-api",
            "password": "HghYv0Q8",
            "orderNumber": order_id,
            "amount": int(total_price) * 100,
            "returnUrl": (f"https://xn--80aamqmn7eb2e.xn--p1ai/"
                          f"paysuccess?id={order_id}"),
            "failUrl": (f"https://xn--80aamqmn7eb2e.xn--p1ai/"
                        f"payfail?id={order_id}")
        }
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        data = urlencode(payload)
        response = requests.post(
            url,
            data=data,
            headers=headers,
            verify='./Cert_CA.pem'
        )

        data = response.json()
        print(data)
        order_id = data["orderId"]
        form_url = data["formUrl"]
        return JsonResponse({
            'orderId': order_id,
            'formUrl': form_url
        })
    else:
        return JsonResponse({'status': f'Заказ {order_id} создан.'})


@api_view(['POST'])
def get_order_status(request, order_id):
    url = "https://3dsec.sberbank.ru/payment/rest/getOrderStatusExtended.do"
    payload = {
        "userName": "t5041214554_230523-api",
        "password": "HghYv0Q8",
        "orderId": order_id,
    }
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = urlencode(payload)
    response = requests.post(
        url,
        data=data,
        headers=headers,
        verify='./Cert_CA.pem'
    )
    if response.status_code != 200:
        return JsonResponse({'message': 'Ошибка получения статуса оплаты'},
                            status=400)
    if request.method != "POST":
        return JsonResponse({'message': 'Поддерживаются только POST-запросы'},
                            status=405)
    data = response.json()
    order_status = data["orderStatus"]
    return JsonResponse({'Статус заказа': order_status})


# ПОМИНКИ-ДОСТАВКА ИНФОРМАЦИЯ О ЗАКАЗЕ
@api_view(['POST'])
def send_order_pominki_dostavka(request, id=None):
    try:
        user_data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'message': 'Неверная полезная нагрузка JSON'},
                            status=400)
    first_name = user_data.get('first_name')
    last_name = user_data.get('last_name')
    middle_name = user_data.get('middle_name')
    phone = user_data.get('phone')
    email = user_data.get('email')
    is_delivery = user_data.get('is_delivery')
    order_id = id
    products = user_data.get('products_data')
    total_price = user_data.get('total_price')
    current_date = datetime.datetime.now()
    moscow_date_string = current_date.strftime('%d.%m.%Y %H:%M:%S')
    date_order = moscow_date_string
    comment = user_data.get('comment')
    if not order_id or not products:
        return JsonResponse(
            {'message': 'Отсутствуют обязательные поля в полезной нагрузке'},
            status=400
        )

    order_text = (f'ПОМИНКИ-ДОСТАВКА\n'
                  f'ЗАКАЗ: #{order_id}\n'
                  f'ДАТА ЗАКАЗА: {date_order}\n\n')
    order_text += (f'ИНФОРМАЦИЯ О ЗАКАЗЧИКЕ:\n'
                   f'Фамилия: {last_name}\n'
                   f'Имя: {first_name}\n'
                   f'Отчество: {middle_name}\n'
                   f'Номер телефона: {phone}\n'
                   f'Почта: {email}\n')
    order_text += '--------------------------------------\n\n'
    order_text += 'СПОСОБ ДОСТАВКИ:\n'
    if int(is_delivery):
        order_text += 'Доставка по адресу:\n'
        street = user_data.get('street')
        entrance = user_data.get('entrance')
        storey = user_data.get('storey')
        flat = user_data.get('flat')
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
        count = product.get('product_count')
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
        f'Поминки-доставка новый заказ: #{order_id}',
        order_text,
        'academy@frantsuz.ru',
        ['academy@frantsuz.ru', 'dostavka@tyteda.ru'],
        fail_silently=False,
    )
    return JsonResponse({'success': True})
