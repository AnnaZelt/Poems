from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import views as auth_views
from base import views

urlpatterns = [
    path('', include('base.urls')),
    path('admin/', admin.site.urls),
    path('api/token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/register/', views.register),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/logout/', csrf_exempt(auth_views.LogoutView.as_view()), name='logout'),
    # path('api/input_list/', views.input_list),
    # path('api/input/<int:pk>/', views.input_detail),
    path('api/generate_poem/', views.create_poem),
    path('api/generated_poem_list/', views.generated_poem_list),
    path('api/generated_poem/<int:pk>/', views.generated_poem_detail),
    # path('api/user_list/', views.user_list),
    path('api/user/<int:pk>/', views.user_detail),
]
