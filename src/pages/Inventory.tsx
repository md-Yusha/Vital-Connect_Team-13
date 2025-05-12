import { useState, useEffect } from "react";
import {
  Package,
  ArrowLeftRight,
  Search,
  BarChart3,
  Share2,
  Building2,
  Loader,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import InventoryManager from "../components/InventoryManager";
import { hospitalApi } from "../services/api";
import authService from "../services/auth";

interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
}

interface HospitalStats {
  id: string;
  name: string;
  location: string;
  availableItems: number;
  status: string;
}

const Inventory = () => {
  const [hospitals, setHospitals] = useState<HospitalStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [activeTransfers, setActiveTransfers] = useState(0);
  const [utilizationRate, setUtilizationRate] = useState(0);
  const [, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    setIsLoggedIn(authService.isLoggedIn());
  }, []);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await hospitalApi.getAll();
        const hospitalsData = response.data.results || [];

        // Fetch stats for each hospital
        const hospitalsWithStats = await Promise.all(
          hospitalsData.map(async (hospital: Hospital) => {
            if (!hospital || !hospital.id) {
              return {
                id: "unknown",
                name: "Unknown Hospital",
                location: "Unknown Location",
                availableItems: 0,
                status: "Error",
              };
            }

            try {
              const statsResponse = await hospitalApi.getStats(hospital.id);
              const stats = statsResponse.data || {};

              return {
                id: hospital.id,
                name: hospital.name || "Unnamed Hospital",
                location: `${hospital.city || "Unknown City"}, ${
                  hospital.state || "Unknown State"
                }`,
                availableItems: stats.total_quantity || 0,
                status: "Connected",
              };
            } catch (err) {
              console.error(
                `Error fetching stats for hospital ${hospital.id}:`,
                err
              );
              return {
                id: hospital.id,
                name: hospital.name || "Unnamed Hospital",
                location: `${hospital.city || "Unknown City"}, ${
                  hospital.state || "Unknown State"
                }`,
                availableItems: 0,
                status: "Error",
              };
            }
          })
        );

        setHospitals(hospitalsWithStats);

        // Calculate total items
        const total = hospitalsWithStats.reduce(
          (sum, hospital) => sum + hospital.availableItems,
          0
        );
        setTotalItems(total);

        // Set dummy values for now
        setActiveTransfers(Math.floor(Math.random() * 20));
        setUtilizationRate(Math.floor(Math.random() * 100));
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        setError("Failed to load hospitals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Inventory Management System
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage your clinic's inventory and connect with other healthcare
          facilities in your network.
        </p>
      </div>

      {/* Register Clinic Button */}
      <div className="mb-8 text-center">
        <Link
          to="/register-clinic"
          className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Building2 className="h-5 w-5 mr-2" />
          Register Your Clinic
        </Link>
      </div>

      {/* Inventory Manager */}
      <div className="mb-16">
        <InventoryManager />
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search facilities or items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Resources
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <Package className="h-10 w-10 text-teal-600" />
            <div>
              <p className="text-gray-600">Total Items</p>
              {loading ? (
                <div className="flex items-center">
                  <Loader className="h-5 w-5 text-teal-600 animate-spin mr-2" />
                  <span>Loading...</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {totalItems.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <ArrowLeftRight className="h-10 w-10 text-blue-600" />
            <div>
              <p className="text-gray-600">Active Transfers</p>
              {loading ? (
                <div className="flex items-center">
                  <Loader className="h-5 w-5 text-blue-600 animate-spin mr-2" />
                  <span>Loading...</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {activeTransfers}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <BarChart3 className="h-10 w-10 text-green-600" />
            <div>
              <p className="text-gray-600">Utilization Rate</p>
              {loading ? (
                <div className="flex items-center">
                  <Loader className="h-5 w-5 text-green-600 animate-spin mr-2" />
                  <span>Loading...</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {utilizationRate}%
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Connected Hospitals Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Connected Facilities
          </h2>
        </div>

        {error && (
          <div className="p-6 text-center">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="p-12 text-center">
            <Loader className="h-10 w-10 text-teal-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading hospitals...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Facility Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hospitals.length > 0 ? (
                  hospitals.map((hospital) => (
                    <tr key={hospital.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {hospital.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {hospital.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {hospital.availableItems}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            hospital.status === "Connected"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {hospital.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          to={`/hospital/${hospital.id}`}
                          className="text-teal-600 hover:text-teal-900"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <Building2 className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                      <p>No hospitals registered yet.</p>
                      <Link
                        to="/register-clinic"
                        className="inline-block mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                      >
                        Register Your Clinic
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
