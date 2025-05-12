from rest_framework import serializers
from .models import Hospital, InventoryItem, Transaction, TransactionItem

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = '__all__'
        
class InventoryItemDetailSerializer(serializers.ModelSerializer):
    hospital_name = serializers.CharField(source='hospital.name', read_only=True)
    
    class Meta:
        model = InventoryItem
        fields = '__all__'

class TransactionItemSerializer(serializers.ModelSerializer):
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = TransactionItem
        fields = ['id', 'inventory_item', 'item_name', 'quantity', 'unit_price', 'total_price']

class TransactionSerializer(serializers.ModelSerializer):
    items = TransactionItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Transaction
        fields = '__all__'
        
class TransactionCreateSerializer(serializers.ModelSerializer):
    items = TransactionItemSerializer(many=True)
    
    class Meta:
        model = Transaction
        fields = '__all__'
        
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        transaction = Transaction.objects.create(**validated_data)
        
        for item_data in items_data:
            inventory_item = item_data.get('inventory_item')
            quantity = item_data.get('quantity')
            
            # Create transaction item
            TransactionItem.objects.create(
                transaction=transaction,
                inventory_item=inventory_item,
                item_name=item_data.get('item_name', inventory_item.name if inventory_item else ''),
                quantity=quantity,
                unit_price=item_data.get('unit_price')
            )
            
            # Update inventory quantity
            if inventory_item:
                inventory_item.quantity -= quantity
                inventory_item.save()
                
        return transaction