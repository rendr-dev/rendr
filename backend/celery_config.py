# from redis import SSLConnection

# Deprecated settings for local development
# BROKER_URL = 'redis://localhost:6379/0' 
# CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'

# Redis URL for Heroku
import os
import ssl

REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379')

# TODO: hacky solution, consider fixing with proper ssl cert
BROKER_URL = REDIS_URL + '?ssl_cert_reqs=CERT_NONE'
CELERY_RESULT_BACKEND = REDIS_URL + '?ssl_cert_reqs=CERT_NONE'

# SSL support for the Redis broker
# BROKER_USE_SSL = {
#     'ssl_cert_reqs': SSLConnection.CERT_NONE,
#     'ssl_keyfile': None,
#     'ssl_certfile': None,
#     'ssl_ca_certs': None,
#     'ssl_check_hostname': False,
# }

# Transport options (can be adjusted based on your needs)
# BROKER_TRANSPORT_OPTIONS = {
#     'visibility_timeout': 3600,
#     'queue_order_strategy': 'sorted',
#     'socket_keepalive': True,
#     'retry_on_timeout': True
# }

# Note: If you're using the latest version of Celery, some configurations 
# like BROKER_URL might need to be updated to use the new naming conventions
# e.g., broker_url instead of BROKER_URL.
