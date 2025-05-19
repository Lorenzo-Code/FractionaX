import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Retrieve values
HEDERA_ACCOUNT_ID = os.getenv("HEDERA_ACCOUNT_ID")
HEDERA_PRIVATE_KEY = os.getenv("HEDERA_PRIVATE_KEY")
HEDERA_NETWORK = os.getenv("HEDERA_NETWORK")





# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Static files setup
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'collected_static')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend/build/static'),  # Ensure React static files
]

# Media files setup
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')



# Secret key and debug mode
SECRET_KEY = 'django-insecure-5hv0$1^j*bg9tq5p8py#b343lfa(jahyon76qvyj5t#sc5becz'
DEBUG = True

# Allowed hosts
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '10.0.0.216', 'MainComputer.hsd1.tx.comcast.net', 'clownfish-app-vhxtw.ondigitalocean.app']  # Add any additional hosts or IPs as needed


# Define AUTH_USER_MODEL early
AUTH_USER_MODEL = "marketplace.User"

APPEND_SLASH = True



# Installed apps
INSTALLED_APPS = [
    'django.contrib.admin', # Added for admin panel
    'django.contrib.auth', # Added for authentication
    'django.contrib.contenttypes', # Added for content types
    'django.contrib.sessions', # Added for sessions
    'django.contrib.messages', # Added for messages
    'django.contrib.staticfiles', # Added for static files
    'rest_framework', # Added for REST API
    'corsheaders',     # Added for CORS handling
    'marketplace', # Your custom app
    'myapp.apps.MyappConfig', # Your custom app
    'oauth2_provider',  # Add this line!
    'django_extensions',  # ✅ Enables HTTPS support
]




REST_FRAMEWORK = {
     "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",  # ✅ Token-based auth
        "oauth2_provider.contrib.rest_framework.OAuth2Authentication",  # ✅ OAuth2 (if used)
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
}

# Enable OAuth2 token expiration settings
OAUTH2_PROVIDER = {
    "ACCESS_TOKEN_EXPIRE_SECONDS": 3600,  # Token expires in 1 hour
    "REFRESH_TOKEN_EXPIRE_SECONDS": 86400,  # Refresh token expires in 1 day
    "ROTATE_REFRESH_TOKENS": True,  # Generate a new refresh token when used
}

# Middleware
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Ensure CORS middleware is at the top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

SESSION_EXPIRE_AT_BROWSER_CLOSE = True  # Persistent sessions
SESSION_COOKIE_AGE = 3600  # Session expires in 1 hour
SESSION_SAVE_EVERY_REQUEST = True  # Update session expiry
SESSION_COOKIE_SECURE = True  # ✅ Ensures session cookies are sent only over HTTPS

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",  # Optional: Default backend
]


# CORS configuration
CORS_ALLOW_ALL_ORIGINS = True  # Set to True for temporary debugging; False for production

CSP_SCRIPT_SRC = [
    "'self'",
    "'unsafe-eval'",  # Add this temporarily
]

# Enable CSRF cookie settings
CSRF_COOKIE_HTTPONLY = False  # Allows frontend to access CSRF token
CSRF_COOKIE_SECURE = True  # Set to True in production with HTTPS
CSRF_COOKIE_SAMESITE = "Lax"  # Prevents CSRF issues on cross-origin requests

# Allow frontend to send CSRF-protected requests
CORS_ALLOW_CREDENTIALS = True



CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # React frontend during development
    'http://127.0.0.1:3000',  # Django Backend using
    'http://10.0.0.216:3000', # Local IP for testing
    'https://clownfish-app-vhxtw.ondigitalocean.app',  # Production URL
]
CORS_ALLOW_HEADERS = [
    'content-type',
    'authorization',
    "x-csrftoken",
]
CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
]
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://10.0.0.216:3000',
    'http://127.0.0.1:8000',
    'https://clownfish-app-vhxtw.ondigitalocean.app/',
]

# Root URL configuration
ROOT_URLCONF = 'backend.urls'

# Template configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'frontend/build')],  # React's index.html
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

# WSGI application
WSGI_APPLICATION = 'backend.wsgi.application'

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
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

# LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": False,
#     "handlers": {
#         "console": {
#             "class": "logging.StreamHandler",
#         },
#     },
#     "loggers": {
#         "django": {
#             "handlers": ["console"],
#             "level": "DEBUG",
#         },
#     },
# }


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Security settings
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ✅ Add these API keys (replace with actual keys)
RENTCAST_API_KEY = "9db8e26ed0e04f578a10693a8952e14b" 
ATTOM_API_KEY = "6fe380f4c3319b3cc2adbadf57b8594e"
GOOGLE_API_KEY = "AIzaSyD4mZ9O6xNzGq7mLb6Oz9Qe3J8w0g1yGcY"

