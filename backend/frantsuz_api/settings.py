import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv(
    'SECRET_KEY',
    default='django-insecure-u3cj2p@gd4&pzj7br(5jq_*3z^oz3k-k!y=l^@r6nq*-58wpc5'
)

DEBUG = False

if DEBUG:
    ALLOWED_HOSTS = [
        '*',
        '127.0.0.1',
        'localhost',
    ]
else:
    ALLOWED_HOSTS = [
        'frantsuz.ru',
        '37.140.195.3',
    ]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'djoser',
    'corsheaders',
    'drf_yasg',
    'phonenumber_field',
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

if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'academy',
            'USER': 'academy_user',
            'PASSWORD': '20031956tAA',
            'HOST': 'db',
            'PORT': '5432'
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

STATIC_URL = '/backend_static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'backend_static/')

MEDIA_URL = '/backend_media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'backend_media/')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'users.User'
AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'users.backends.PhoneBackend',
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

CORS_URLS_REGEX = r'^/api/.*$'
if DEBUG:
    CORS_ORIGIN_ALLOW_ALL = True
else:
    CORS_ALLOWED_ORIGINS = [
        'https://frantsuz.ru',
        'https://37.140.195.3',
        'https://37.140.195.3:3000',
        'https://37.140.195.3:8000',
        'https://shashlandia.ru',
        'https://37.140.192.105',
        'https://37.140.192.105:3000',
        'https://37.140.192.105:8000',
        'https://pominki-dostavka.ru',
    ]

DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'ACTIVATION_URL': 'activation/{uid}/{token}',
    'PASSWORD_RESET_CONFIRM_URL': 'reset_password_confirm/?uid={uid}&token={token}',
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
