from django.contrib import admin
from .models import Hospital, InventoryItem, Transaction, TransactionItem

@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'phone_number', 'email', 'contact_person')
    search_fields = ('name', 'city', 'state', 'email', 'contact_person')
    list_filter = ('state', 'city')

@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'hospital', 'quantity', 'category', 'price')
    search_fields = ('name', 'category', 'hospital__name')
    list_filter = ('category', 'hospital')

class TransactionItemInline(admin.TabularInline):
    model = TransactionItem
    extra = 0
    readonly_fields = ('total_price',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'hospital', 'customer_name', 'payment_method', 'total_amount', 'created_at')
    search_fields = ('customer_name', 'customer_email', 'hospital__name')
    list_filter = ('payment_method', 'created_at', 'hospital')
    inlines = [TransactionItemInline]

@admin.register(TransactionItem)
class TransactionItemAdmin(admin.ModelAdmin):
    list_display = ('item_name', 'transaction', 'quantity', 'unit_price', 'total_price')
    search_fields = ('item_name', 'transaction__customer_name')
    list_filter = ('transaction__created_at',)
