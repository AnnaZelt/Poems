from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from django.forms import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from .models import Input, GeneratedPoem
from .serializers import InputSerializer, GeneratedPoemSerializer, UserSerializer, CustomTokenObtainPairSerializer
from poems.gpt_model import generate_poem
import logging

User = get_user_model()
logger = logging.getLogger('base.view')

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['GET'])
def index(request):
    return Response('hello')

import psutil
def bytes_to_gb(bytes):
    gb = bytes / (1024 ** 3)
    return gb

process = psutil.Process()
memory_info = process.memory_info()
print(f"Memory Usage: {bytes_to_gb(memory_info.rss)} GB")


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    logger.debug('Register view called')
    if request.user.is_authenticated:
        logger.warning('User is already registered')
        return Response({'error': 'User is already registered.'}, status=400)
    else:
        password = request.data.get('password', '')
        request.data['is_active'] = True
        request.data['password'] = make_password(password)  # Hash the password
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            logger.info('User registered successfully')
            return Response(user_serializer.data, status=201)
        logger.error('User registration failed')
        return Response(user_serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_poem(request):
    logger.debug('Create poem view called')
    input_text = request.data.get('input_text', '')
    poet_style = request.data.get('poet_style', '')

    if request.user.is_authenticated:
        user_id = request.user.id
    else:
        user_id = None
    input_serializer = InputSerializer(data={'user': user_id, 'input_text': input_text})
    if input_serializer.is_valid():
        input_obj = input_serializer.save()
        generated_poem_text = generate_poem(input_obj.input_text, poet_style)

        poem_serializer = GeneratedPoemSerializer(data={'user': user_id, 'input': input_obj.id, 'poem_text': generated_poem_text})
        if poem_serializer.is_valid():
            poem_serializer.save()
            return Response(poem_serializer.data, status=201)
        # If poem_serializer is not valid, set the input object to inactive
        input_obj.is_active = False
        input_obj.save()
        return Response(poem_serializer.errors, status=400)

    return Response(input_serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generated_poem_list(request):
    logger.debug('Generated poem list view called')
    if request.user.is_superuser:
        poems = GeneratedPoem.objects.all().select_related('user')
    else:
        poems = GeneratedPoem.objects.filter(user=request.user).select_related('user')

    serializer = GeneratedPoemSerializer(poems, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def generated_poem_detail(request, pk):
    logger.debug('Generated poem detail view called')
    try:
        poem = GeneratedPoem.objects.select_related('user').get(pk=pk)
    except GeneratedPoem.DoesNotExist:
        return Response(status=404)

    if request.user.is_superuser or request.user == poem.user:
        if request.method == 'GET':
            serializer = GeneratedPoemSerializer(poem)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = GeneratedPoemSerializer(poem, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        elif request.method == 'DELETE':
            poem.is_active = False
            poem.save()
            return Response(status=204)
    else:
        return Response({"message": "You do not have permission to perform this action"}, status=403)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_detail(request, pk):
    logger.debug('User detail view called')
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=404)

    if request.user.is_superuser or request.user == user:
        if request.method == 'GET':
            serializer = UserSerializer(user)
            return Response(serializer.data)
        elif request.method == 'PUT':
            # Extract the password from request data if present
            password = request.data.pop('password', None)

            # If a new password is provided, hash it and update the request data
            if password:
                request.data['password'] = make_password(password)

            # Use partial update to allow updating other fields without the password
            serializer = UserSerializer(user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        elif request.method == 'DELETE':
                    user.is_active = False
                    user.save()
                    return Response(status=204)
    else:
        return Response({"message": "You do not have permission to perform this action"}, status=403)
