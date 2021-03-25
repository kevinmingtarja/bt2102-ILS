from django.apps import AppConfig


class ServerConfig(AppConfig):
    name = 'server'


class MyappConfig(AppConfig):
    name = 'myapp'
    def ready(self):
        from . import updater
        updater.start()

    