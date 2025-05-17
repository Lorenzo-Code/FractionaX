from django.core.management.commands.runserver import Command as RunServerCommand

class Command(RunServerCommand):
    def add_arguments(self, parser):
        super().add_arguments(parser)
        parser.set_defaults(addrport="0.0.0.0:8000")
