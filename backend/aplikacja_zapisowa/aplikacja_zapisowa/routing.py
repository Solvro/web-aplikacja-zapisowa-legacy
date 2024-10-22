from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import enrolmentpanel.routing

ASGI_APPLICATION = "aplikacja_zapisowa.routing.application"

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            enrolmentpanel.routing.websocket_urlpatterns
        )
    ),
})