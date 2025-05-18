# myapp/apps.py
from django.apps import AppConfig
import os

class MyappConfig(AppConfig):
    name = 'myapp'
    path = os.path.dirname(os.path.abspath(__file__))  # Resolves the path issue
