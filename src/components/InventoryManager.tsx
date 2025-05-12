import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  ShoppingCart,
  Minus,
  Plus as PlusIcon,
  Download,
} from "lucide-react";
import { usePDF } from "react-to-pdf";
import { inventoryApi, hospitalApi } from "../services/api";
import authService from "../services/auth";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  description: string;
  price: number;
  hospital: string;
}

interface CartItem extends InventoryItem {
  selectedQuantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface PaymentInfo {
  method: "cash" | "online";
  transactionId?: string;
}

interface Hospital {
  id: string;
  name: string;
}

const InventoryManager = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    setIsLoggedIn(authService.isLoggedIn());
  }, []);

  // Fetch hospitals and inventory items
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        // Check if user is logged in
        const hospital = localStorage.getItem("hospital");
        if (hospital) {
          const hospitalData = JSON.parse(hospital);
          setHospitals([hospitalData]);
          setSelectedHospital(hospitalData.id);
          setIsLoggedIn(true);
        } else {
          // If not logged in, fetch all hospitals
          const response = await hospitalApi.getAll();
          setHospitals(response.data.results || []);

          // Select the first hospital by default if available
          if (response.data.results && response.data.results.length > 0) {
            setSelectedHospital(response.data.results[0].id);
          }
        }
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        setError("Failed to load hospitals. Please try again.");
      }
    };

    fetchHospitals();
  }, []);

  // Fetch inventory items when selected hospital changes
  useEffect(() => {
    const fetchInventoryItems = async () => {
      if (!selectedHospital) return;

      setLoading(true);
      setError(null);

      try {
        const response = await hospitalApi.getInventory(selectedHospital);
        setItems(response.data || []);
      } catch (err) {
        console.error("Error fetching inventory items:", err);
        setError("Failed to load inventory items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryItems();
  }, [selectedHospital]);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "cash",
  });
  const billRef = useRef<HTMLDivElement>(null);
  const { toPDF, targetRef } = usePDF({ filename: "bill.pdf" });
  const [newItem, setNewItem] = useState<Omit<InventoryItem, "id">>({
    name: "",
    quantity: 0,
    category: "",
    description: "",
    price: 0,
    hospital: "",
  });

  const handleAddItem = async () => {
    if (newItem.name && newItem.quantity > 0 && selectedHospital) {
      try {
        // Create inventory item in the backend
        const itemData = {
          ...newItem,
          hospital: selectedHospital,
        };

        const response = await inventoryApi.create(itemData);
        const newItemFromServer = response.data;

        // Add the new item to the local state
        setItems([...items, newItemFromServer]);

        // Reset form
        setNewItem({
          name: "",
          quantity: 0,
          category: "",
          description: "",
          price: 0,
          hospital: "",
        });
        setIsAdding(false);
      } catch (err) {
        console.error("Error adding inventory item:", err);
        alert("Failed to add inventory item. Please try again.");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      // Delete item from backend
      await inventoryApi.delete(id);

      // Update local state
      setItems(items.filter((item) => item.id !== id));
      setCart(cart.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting inventory item:", err);
      alert("Failed to delete inventory item. Please try again.");
    }
  };

  const handleAddToCart = (item: InventoryItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, selectedQuantity: cartItem.selectedQuantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, selectedQuantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item) => item.id !== itemId));
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, selectedQuantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price =
        item.price !== undefined && item.price !== null
          ? isNaN(Number(item.price))
            ? 0
            : Number(item.price)
          : 0;
      return total + price * item.selectedQuantity;
    }, 0);
  };

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;

    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePaymentMethodChange = (method: "cash" | "online") => {
    setPaymentInfo({ method });
  };

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const generateBill = () => {
    if (billRef.current) {
      toPDF();
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Inventory Items</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCart(!showCart)}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart ({cart.length})
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Item
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search items by name, category, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Add New Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: parseFloat(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Add Item
            </button>
          </div>
        </div>
      )}

      {showCart && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Shopping Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      $
                      {item.price !== undefined && item.price !== null
                        ? typeof item.price === "number"
                          ? item.price.toFixed(2)
                          : isNaN(Number(item.price))
                          ? "0.00"
                          : Number(item.price).toFixed(2)
                        : "0.00"}{" "}
                      each
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.selectedQuantity - 1
                          )
                        }
                        className="p-1 text-gray-600 hover:text-gray-800"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">
                        {item.selectedQuantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.selectedQuantity + 1
                          )
                        }
                        className="p-1 text-gray-600 hover:text-gray-800"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-medium">Total:</span>
                <span className="font-bold">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {showCheckout && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Checkout</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Customer Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleCustomerInfoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleCustomerInfoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Payment Method</h4>
              <div className="flex gap-4">
                <button
                  onClick={() => handlePaymentMethodChange("cash")}
                  className={`px-4 py-2 rounded-lg ${
                    paymentInfo.method === "cash"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Cash
                </button>
                <button
                  onClick={() => handlePaymentMethodChange("online")}
                  className={`px-4 py-2 rounded-lg ${
                    paymentInfo.method === "online"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Online Payment
                </button>
              </div>
            </div>

            {paymentInfo.method === "online" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction ID
                </label>
                <input
                  type="text"
                  value={paymentInfo.transactionId || ""}
                  onChange={(e) =>
                    setPaymentInfo({
                      ...paymentInfo,
                      transactionId: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            )}

            <div ref={targetRef} className="hidden">
              <div className="p-8 max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Medical Supply Bill
                  </h1>
                  <p className="text-gray-600">
                    Invoice #
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </p>
                </div>

                {/* Company Info */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    VitalConnect Medical Supplies
                  </h2>
                  <p className="text-gray-600">123 Medical Center Drive</p>
                  <p className="text-gray-600">Healthcare City, HC 12345</p>
                  <p className="text-gray-600">Phone: (555) 123-4567</p>
                  <p className="text-gray-600">
                    Email: contact@vitalconnect.com
                  </p>
                </div>

                {/* Bill Details */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Bill To:
                    </h3>
                    <p className="text-gray-700">{customerInfo.name}</p>
                    <p className="text-gray-700">{customerInfo.address}</p>
                    <p className="text-gray-700">{customerInfo.phone}</p>
                    <p className="text-gray-700">{customerInfo.email}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Bill Details:
                    </h3>
                    <p className="text-gray-700">
                      Date: {formatDate(new Date())}
                    </p>
                    <p className="text-gray-700">
                      Payment Method: {paymentInfo.method.toUpperCase()}
                    </p>
                    {paymentInfo.transactionId && (
                      <p className="text-gray-700">
                        Transaction ID: {paymentInfo.transactionId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                          Item Description
                        </th>
                        <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">
                          Quantity
                        </th>
                        <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">
                          Unit Price
                        </th>
                        <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-3 px-4 text-gray-700">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-700">
                            {item.selectedQuantity}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-700">
                            $
                            {item.price !== undefined && item.price !== null
                              ? typeof item.price === "number"
                                ? item.price.toFixed(2)
                                : isNaN(Number(item.price))
                                ? "0.00"
                                : Number(item.price).toFixed(2)
                              : "0.00"}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-700">
                            $
                            {(
                              (item.price !== undefined && item.price !== null
                                ? isNaN(Number(item.price))
                                  ? 0
                                  : Number(item.price)
                                : 0) * item.selectedQuantity
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td
                          colSpan={3}
                          className="py-3 px-4 text-right font-semibold text-gray-700"
                        >
                          Subtotal:
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-700">
                          ${calculateTotal().toFixed(2)}
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td
                          colSpan={3}
                          className="py-3 px-4 text-right font-semibold text-gray-700"
                        >
                          Tax (0%):
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-700">
                          $0.00
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td
                          colSpan={3}
                          className="py-3 px-4 text-right font-bold text-gray-900"
                        >
                          Total:
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-gray-900">
                          ${calculateTotal().toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Terms and Conditions */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Terms & Conditions
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>All items are subject to availability</li>
                    <li>
                      Returns accepted within 7 days of purchase with original
                      receipt
                    </li>
                    <li>Warranty information available upon request</li>
                    <li>
                      For any queries, please contact our customer service
                    </li>
                  </ul>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                  <p>Thank you for your business!</p>
                  <p>
                    This is a computer-generated invoice and does not require a
                    signature
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCheckout(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={generateBill}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Generate Bill
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.quantity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    $
                    {item.price !== undefined && item.price !== null
                      ? typeof item.price === "number"
                        ? item.price.toFixed(2)
                        : isNaN(Number(item.price))
                        ? "0.00"
                        : Number(item.price).toFixed(2)
                      : "0.00"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="text-teal-600 hover:text-teal-900"
                    >
                      Add to Cart
                    </button>
                    <button className="text-teal-600 hover:text-teal-900">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  {searchQuery
                    ? "No items found matching your search"
                    : "No items in inventory"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManager;
