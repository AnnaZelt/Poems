from rest_framework import serializers
from .models import Input, GeneratedPoem
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User

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

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['id'] = user.id
        data['username'] = user.username
        data['email'] = user.email
        data['is_active'] = user.is_active
        return data

