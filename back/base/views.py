from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Input, GeneratedPoem
from poems.gpt_model import generate_poem
from .serializers import InputSerializer, GeneratedPoemSerializer, UserSerializer

@api_view(['GET'])
def index(req):
    return Response('hello')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.username
        return token
 
 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def input_list(request):
    if request.user.is_superuser:
        inputs = Input.objects.all()
    else:
        inputs = Input.objects.filter(user_id=request.user)

    serializer = InputSerializer(inputs, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def input_detail(request, pk):
    try:
        input_obj = Input.objects.get(pk=pk)
    except Input.DoesNotExist:
        return Response(status=404)

    if request.user.is_superuser:
        serializer = InputSerializer(input_obj)
        return Response(serializer.data)

    if request.user != input_obj.user_id:
        return Response({"message": "You do not have permission to perform this action"}, status=403)

    if request.method == 'GET':
        serializer = InputSerializer(input_obj)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = InputSerializer(input_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        input_obj.is_active = False
        input_obj.save()
        return Response(status=204)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generated_poem_list(request):
    if request.user.is_superuser:
        poems = GeneratedPoem.objects.all()
    else:
        inputs = Input.objects.filter(user_id=request.user)
        input_ids = inputs.values_list('id', flat=True)
        poems = GeneratedPoem.objects.filter(input_id__in=input_ids)

    serializer = GeneratedPoemSerializer(poems, many=True)
    return Response(serializer.data)

    
@api_view(['POST'])
def create_poem(request):
    input_text = request.data.get('input_text', '')
    poet_style = request.data.get('poet_style', '')

    input_serializer = InputSerializer(data={'user_id': request.user.id, 'input_text': input_text})
    if input_serializer.is_valid():
        input_obj = input_serializer.save()
        generated_poem_text = generate_poem(input_obj.input_text, poet_style)

        poem_serializer = GeneratedPoemSerializer(data={'input_id': input_obj.id, 'user_id': request.user.id, 'text': generated_poem_text})
        if poem_serializer.is_valid():
            poem_serializer.save()
            return Response(poem_serializer.data, status=201)
        # If poem_serializer is not valid, delete the input object
        input_obj.delete()
        return Response(poem_serializer.errors, status=400)

    return Response(input_serializer.errors, status=400)




@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def generated_poem_detail(request, pk):
    try:
        poem = GeneratedPoem.objects.get(pk=pk)
    except GeneratedPoem.DoesNotExist:
        return Response(status=404)

    if request.user.is_superuser:
        serializer = GeneratedPoemSerializer(poem)
        return Response(serializer.data)

    if request.user != poem.user_id:
        return Response({"message": "You do not have permission to perform this action"}, status=403)

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


User = get_user_model()

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=404)

    if request.user.is_superuser:
        serializer = UserSerializer(user)
        return Response(serializer.data)

    if request.user != user:
        return Response({"message": "You do not have permission to perform this action"}, status=403)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        user.is_active = False
        user.save()
        return

