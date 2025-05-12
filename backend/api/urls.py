from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HospitalViewSet, InventoryItemViewSet, TransactionViewSet
from .auth import register_hospital, login_hospital, get_current_hospital

router = DefaultRouter()
router.register(r'hospitals', HospitalViewSet)
router.register(r'inventory', InventoryItemViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register_hospital, name='register_hospital'),
    path('auth/login/', login_hospital, name='login_hospital'),
    path('auth/me/', get_current_hospital, name='get_current_hospital'),
]