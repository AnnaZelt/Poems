from rest_framework import serializers
from .models import Input, GeneratedPoem
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active']

class InputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Input
        fields = ['id', 'user', 'input_text', 'timestamp', 'is_active']

class GeneratedPoemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedPoem
        fields = ['id', 'user', 'input', 'poem_text', 'favorited', 'timestamp', 'is_active']
