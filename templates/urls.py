from django.contrib import admin
from django.urls import path
from django.shortcuts import render

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', lambda request: render(request, 'index.html')),  # Render index.html
    path('about/', lambda request: render(request, 'other_template.html')),  # Render other_template.html
]
