import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-u3cj2p@gd4&pzj7br(5jq_*3z^oz3k-k!y=l^@r6nq*-58wpc5'

DEBUG = True

ALLOWED_HOSTS = [
    '*',
    '127.0.0.1',
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'rest_framework.authtoken',
    'djoser',
    'phonenumber_field',
    'drf_yasg',
    'users.apps.UsersConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'frantsuz_api.urls'

TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATES_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'frantsuz_api.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'users.User'
AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'users.backends.PhoneBackend',
)

REST_FRAMEWORK = {
    # 'DEFAULT_PERMISSION_CLASSES': [
    #     'rest_framework.permissions.IsAuthenticated',
    # ],

    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
CORS_URLS_REGEX = r'^/api/.*$'
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]

DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'ACTIVATION_URL': 'api/users/activation/{uid}/{token}',
    'PASSWORD_RESET_CONFIRM_URL': 'api/users/reset_password_confirm/?uid={uid}&token={token}',
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'SEND_ACTIVATION_EMAIL': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND': True,
    'LOGOUT_ON_PASSWORD_CHANGE': True,
    'SET_PASSWORD_RETYPE': True,
    'SERIALIZERS': {
        'user_create': 'users.serializers.UserCreateSerializer',
        'user': 'users.serializers.UserSerializer',
    },
    'PERMISSIONS': {
        'activation': ['rest_framework.permissions.AllowAny'],
        'password_reset_confirm': ['rest_framework.permissions.AllowAny'],
        'set_password': ['djoser.permissions.CurrentUserOrAdmin'],
        'username_reset': ['rest_framework.permissions.AllowAny'],
        'username_reset_confirm': ['rest_framework.permissions.AllowAny'],
        'set_username': ['djoser.permissions.CurrentUserOrAdmin'],
        'user_create': ['rest_framework.permissions.AllowAny'],
        'user_delete': ['djoser.permissions.CurrentUserOrAdmin'],
        'user': ['rest_framework.permissions.AllowAny'],
        'user_list': ['rest_framework.permissions.AllowAny'],
        'token_create': ['rest_framework.permissions.AllowAny'],
        'token_destroy': ['rest_framework.permissions.IsAuthenticated'],
    }
}

PHONENUMBER_DEFAULT_REGION = 'RU'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'server61.hosting.reg.ru'
EMAIL_PORT = 465
EMAIL_HOST_USER = 'academy@frantsuz.ru'
EMAIL_HOST_PASSWORD = 'wE6aN6lC6e'
EMAIL_USE_SSL = True
DEFAULT_FROM_EMAIL = 'academy@frantsuz.ru'
SERVER_EMAIL = 'academy@frantsuz.ru'
