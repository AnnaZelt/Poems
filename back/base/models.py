from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class Input(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Allow null/blank for anonymous users
    input_text = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)

class GeneratedPoem(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    input_id = models.ForeignKey(Input, on_delete=models.CASCADE, null=True, blank=True)
    poem_text = models.TextField()
    favorited = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
