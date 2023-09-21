# from redis import SSLConnection

# Deprecated settings for local development
# BROKER_URL = 'redis://localhost:6379/0' 
# CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'

# Redis URL for Heroku
BROKER_URL = 'redis://:p5f37b645dce7a876b4564a7e85c63324dbeb7ffbe7a901f91da4220695387f46@ec2-54-160-230-30.compute-1.amazonaws.com:29359'
CELERY_RESULT_BACKEND = 'redis://:p5f37b645dce7a876b4564a7e85c63324dbeb7ffbe7a901f91da4220695387f46@ec2-54-160-230-30.compute-1.amazonaws.com:29359'

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
