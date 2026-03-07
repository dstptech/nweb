"""
DSTP Backend — WSGI Configuration

Entry point for synchronous WSGI servers (Gunicorn, uWSGI, Apache mod_wsgi).
Use this for standard HTTP workloads without WebSocket support.

Production launch command:
    gunicorn dstp_backend.wsgi:application \
        --workers 4 \
        --worker-class sync \
        --bind 0.0.0.0:8000 \
        --timeout 120 \
        --access-logfile - \
        --error-logfile -

Documentation:
    https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

# Default to dev settings — production overrides via system environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = get_wsgi_application()