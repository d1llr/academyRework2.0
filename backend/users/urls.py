from django.urls import include, path
from djoser.views import TokenCreateView

from .views import (TokenCreateByPhoneView, get_order_status, send_email,
                    send_order_pominki_dostavka, send_order_shashlandia)

urlpatterns = [
    path('', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/token-email/',
         TokenCreateView.as_view(),
         name='token_email'
         ),
    path(
        'auth/token-phone/',
        TokenCreateByPhoneView.as_view(),
        name='token_phone'
    ),
    path('send-email/', send_email, name='send_email'),
    path(
        'send-order-email/<int:order_id>/',
        send_order_shashlandia,
        name='send_order'
    ),
    path(
        'send-order-pominki/<int:id>/',
        send_order_pominki_dostavka,
        name='send_order_pomiki'
    ),
    path(
        'get_pay_status/<str:order_id>/',
        get_order_status,
        name='pay_status'
    ),
]
