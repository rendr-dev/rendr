# celery_config.py

BROKER_URL = 'redis://localhost:6379/0' # Redis as a message broker
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0' # Redis as backend to store task results