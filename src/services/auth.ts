import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Create axios instance with base URL
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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterHospitalData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  email: string;
  password: string;
  contact_person: string;
  license_number: string;
  latitude?: number;
  longitude?: number;
}

export interface Hospital {
  id: string;
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
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  token: string;
  hospital: Hospital;
}

const authService = {
  // Register a new hospital/clinic
  register: async (data: RegisterHospitalData): Promise<AuthResponse> => {
    const response = await api.post("/auth/register/", data);
    // Store token in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("hospital", JSON.stringify(response.data.hospital));
    return response.data;
  },

  // Login with email and password
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post("/auth/login/", credentials);
    // Store token in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("hospital", JSON.stringify(response.data.hospital));
    return response.data;
  },

  // Get current logged in hospital
  getCurrentHospital: async () => {
    try {
      const response = await api.get("/auth/me/");
      return response.data;
    } catch (error) {
      // If token is invalid, clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("hospital");
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hospital");
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem("token");
  },

  // Get token
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  // Get current hospital from localStorage
  getHospital: () => {
    const hospital = localStorage.getItem("hospital");
    return hospital ? JSON.parse(hospital) : null;
  },
};

export default authService;
