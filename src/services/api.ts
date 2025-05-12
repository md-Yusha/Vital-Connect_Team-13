import axios from "axios";

// Create axios instance with base URL
const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Define hospital data interface
export interface HospitalData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  email: string;
  contact_person: string;
  license_number: string;
  latitude?: number;
  longitude?: number;
  [key: string]: unknown;
}

// Hospital/Clinic API
export const hospitalApi = {
  // Get all hospitals
  getAll: () => api.get("/hospitals/"),

  // Get hospital by ID
  getById: (id: string) => api.get(`/hospitals/${id}/`),

  // Create new hospital
  create: (data: HospitalData) => api.post("/hospitals/", data),

  // Update hospital
  update: (id: string, data: Partial<HospitalData>) =>
    api.put(`/hospitals/${id}/`, data),

  // Delete hospital
  delete: (id: string) => api.delete(`/hospitals/${id}/`),

  // Get hospital inventory
  getInventory: (id: string) => api.get(`/hospitals/${id}/inventory/`),

  // Get hospital transactions
  getTransactions: (id: string) => api.get(`/hospitals/${id}/transactions/`),

  // Get hospital statistics
  getStats: (id: string) => api.get(`/hospitals/${id}/stats/`),
};

// Define inventory item interface
export interface InventoryItem {
  name: string;
  description?: string;
  quantity: number;
  unit_price?: number;
  category?: string;
  hospital_id?: string;
  expiry_date?: string;
  [key: string]: unknown;
}

// Define query parameters interface
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  order?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

// Inventory API
export const inventoryApi = {
  // Get all inventory items
  getAll: (params?: QueryParams) => api.get("/inventory/", { params }),

  // Get inventory item by ID
  getById: (id: string) => api.get(`/inventory/${id}/`),

  // Create new inventory item
  create: (data: InventoryItem) => api.post("/inventory/", data),

  // Update inventory item
  update: (id: string, data: Partial<InventoryItem>) =>
    api.put(`/inventory/${id}/`, data),

  // Delete inventory item
  delete: (id: string) => api.delete(`/inventory/${id}/`),
};

// Define transaction interface
export interface Transaction {
  type: "in" | "out";
  quantity: number;
  inventory_item_id: string;
  hospital_id: string;
  notes?: string;
  transaction_date?: string;
  [key: string]: unknown;
}

// Transaction API
export const transactionApi = {
  // Get all transactions
  getAll: (params?: QueryParams) => api.get("/transactions/", { params }),

  // Get transaction by ID
  getById: (id: string) => api.get(`/transactions/${id}/`),

  // Create new transaction
  create: (data: Transaction) => api.post("/transactions/", data),
};

export default {
  hospital: hospitalApi,
  inventory: inventoryApi,
  transaction: transactionApi,
};
