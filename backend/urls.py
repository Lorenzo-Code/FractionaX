from django.contrib import admin
from django.urls import path, include, re_path
from oauth2_provider.views import TokenView
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static
from marketplace.views import CustomTokenView  # ✅ Correct import path
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

urlpatterns = [
    # ✅ Admin panel
    path("api/admin/", admin.site.urls),  

    # ✅ API routes (Includes marketplace API)
    path("api/", include("marketplace.urls")),

    # ✅ OAuth2 authentication (Include only here)
    path("o/token/", CustomTokenView.as_view(), name="token"),  # ✅ CSRF-exempt token endpoint
    path("o/", include("oauth2_provider.urls", namespace="oauth2_provider")),  # Other OAuth2 URLs
]

# ✅ Serve static and media files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# ✅ React frontend handling (Catch-all for React)
urlpatterns += [
    re_path(r"^(?!api/).*$", lambda request: HttpResponse(
        open(os.path.join(BASE_DIR, "frontend/build/index.html")).read(),
        content_type="text/html"
    )),
]
