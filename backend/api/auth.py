from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from .models import Hospital
from .serializers import HospitalSerializer
import jwt
import datetime
from django.conf import settings

# Add a secret key to settings.py if not already there
JWT_SECRET = getattr(settings, 'JWT_SECRET', 'your-secret-key')
JWT_ALGORITHM = getattr(settings, 'JWT_ALGORITHM', 'HS256')
JWT_EXP_DELTA_SECONDS = getattr(settings, 'JWT_EXP_DELTA_SECONDS', 86400)  # 24 hours

@api_view(['POST'])
@permission_classes([AllowAny])
def register_hospital(request):
    """
    Register a new hospital/clinic with authentication
    """
    data = request.data.copy()
    
    # Hash the password
    if 'password' in data:
        data['password'] = make_password(data['password'])
    
    serializer = HospitalSerializer(data=data)
    if serializer.is_valid():
        hospital = serializer.save()
        
        # Generate JWT token
        payload = {
            'hospital_id': hospital.id,
            'email': hospital.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=JWT_EXP_DELTA_SECONDS)
        }
        token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
        
        return Response({
            'token': token,
            'hospital': serializer.data
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_hospital(request):
    """
    Login a hospital/clinic
    """
    email = request.data.get('email')
    password = request.data.get('password')
    
    try:
        hospital = Hospital.objects.get(email=email)
    except Hospital.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if check_password(password, hospital.password):
        # Generate JWT token
        payload = {
            'hospital_id': hospital.id,
            'email': hospital.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=JWT_EXP_DELTA_SECONDS)
        }
        token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
        
        serializer = HospitalSerializer(hospital)
        
        return Response({
            'token': token,
            'hospital': serializer.data
        })
    
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_current_hospital(request):
    """
    Get the current logged in hospital/clinic
    """
    token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1] if 'HTTP_AUTHORIZATION' in request.META else None
    
    if not token:
        return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        hospital = Hospital.objects.get(id=payload['hospital_id'])
        serializer = HospitalSerializer(hospital)
        return Response(serializer.data)
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, Hospital.DoesNotExist):
        return Response({'error': 'Invalid or expired token'}, status=status.HTTP_401_UNAUTHORIZED)