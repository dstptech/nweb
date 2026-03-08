"""
DSTP Backend — ASGI Configuration

Entry point for asynchronous ASGI servers (Uvicorn, Daphne, Hypercorn).
Use this when you need async views, WebSockets, or long-polling support.

Production launch command:
    uvicorn dstp_backend.asgi:application \
        --host 0.0.0.0 \
        --port 8000 \
        --workers 4 \
        --loop uvloop \
        --http h11

    # OR with Daphne (Django Channels):
    daphne -b 0.0.0.0 -p 8000 dstp_backend.asgi:application

Documentation:
    https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application

# Default to dev settings — production overrides via system environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Standard Django ASGI app — handles HTTP requests
# If you add Django Channels later for WebSockets, wrap this:
#
#   from channels.routing import ProtocolTypeRouter, URLRouter
#   from channels.auth import AuthMiddlewareStack
#   import your_app.routing
#
#   application = ProtocolTypeRouter({
#       "http": django_asgi_app,
#       "websocket": AuthMiddlewareStack(
#           URLRouter(your_app.routing.websocket_urlpatterns)
#       ),
#   })

application = get_asgi_application()