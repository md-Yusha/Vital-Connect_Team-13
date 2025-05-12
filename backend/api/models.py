from django.db import models
from django.contrib.auth.models import User

class Hospital(models.Model):
    """
    Model to store hospital/clinic information
    """
    name = models.CharField(max_length=255, verbose_name="Clinic Name")
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20, verbose_name="ZIP Code")
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Will store hashed password
    contact_person = models.CharField(max_length=255)
    license_number = models.CharField(max_length=100)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class InventoryItem(models.Model):
    """
    Model to store inventory items for hospitals/clinics
    """
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='inventory_items')
    name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=0)
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} - {self.hospital.name}"

class Transaction(models.Model):
    """
    Model to store transactions (sales/purchases)
    """
    PAYMENT_METHODS = (
        ('cash', 'Cash'),
        ('online', 'Online Payment'),
    )
    
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='transactions')
    customer_name = models.CharField(max_length=255)
    customer_email = models.EmailField(blank=True, null=True)
    customer_phone = models.CharField(max_length=20, blank=True, null=True)
    customer_address = models.TextField(blank=True, null=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default='cash')
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Transaction {self.id} - {self.hospital.name}"

class TransactionItem(models.Model):
    """
    Model to store items in a transaction
    """
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name='items')
    inventory_item = models.ForeignKey(InventoryItem, on_delete=models.SET_NULL, null=True)
    item_name = models.CharField(max_length=255)  # Store name in case inventory item is deleted
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.item_name} - {self.quantity} units"
    
    @property
    def total_price(self):
        return self.quantity * self.unit_price
