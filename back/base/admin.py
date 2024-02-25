from django.contrib import admin
from .models import Input, GeneratedPoem

# Register your models with the admin site
admin.site.register(Input)
admin.site.register(GeneratedPoem)
