from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum, F, Count
from .models import Hospital, InventoryItem, Transaction, TransactionItem
from .serializers import (
    HospitalSerializer, 
    InventoryItemSerializer, 
    InventoryItemDetailSerializer,
    TransactionSerializer,
    TransactionCreateSerializer
)

class HospitalViewSet(viewsets.ModelViewSet):
    """
    API endpoint for hospitals/clinics
    """
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    
    @action(detail=True, methods=['get'])
    def inventory(self, request, pk=None):
        """Get all inventory items for a specific hospital"""
        hospital = self.get_object()
        inventory_items = hospital.inventory_items.all()
        serializer = InventoryItemDetailSerializer(inventory_items, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def transactions(self, request, pk=None):
        """Get all transactions for a specific hospital"""
        hospital = self.get_object()
        transactions = hospital.transactions.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        """Get statistics for a specific hospital"""
        hospital = self.get_object()
        
        # Get total inventory items count
        total_items = hospital.inventory_items.count()
        
        # Get total inventory items quantity
        total_quantity = hospital.inventory_items.aggregate(
            total=Sum('quantity')
        )['total'] or 0
        
        # Get total transactions
        total_transactions = hospital.transactions.count()
        
        # Get total sales amount
        total_sales = hospital.transactions.aggregate(
            total=Sum('total_amount')
        )['total'] or 0
        
        # Get items by category
        items_by_category = hospital.inventory_items.values('category').annotate(
            count=Count('id'),
            total_quantity=Sum('quantity')
        )
        
        return Response({
            'total_items': total_items,
            'total_quantity': total_quantity,
            'total_transactions': total_transactions,
            'total_sales': total_sales,
            'items_by_category': items_by_category
        })

class InventoryItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint for inventory items
    """
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return InventoryItemDetailSerializer
        return InventoryItemSerializer
    
    def get_queryset(self):
        queryset = InventoryItem.objects.all()
        
        # Filter by hospital if provided
        hospital_id = self.request.query_params.get('hospital')
        if hospital_id:
            queryset = queryset.filter(hospital_id=hospital_id)
            
        # Filter by category if provided
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
            
        # Filter by name if provided
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
            
        return queryset

class TransactionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for transactions
    """
    queryset = Transaction.objects.all()
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return TransactionCreateSerializer
        return TransactionSerializer
    
    def get_queryset(self):
        queryset = Transaction.objects.all()
        
        # Filter by hospital if provided
        hospital_id = self.request.query_params.get('hospital')
        if hospital_id:
            queryset = queryset.filter(hospital_id=hospital_id)
            
        # Filter by date range if provided
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date and end_date:
            queryset = queryset.filter(created_at__range=[start_date, end_date])
            
        return queryset
