import React from "react";
import {
  Package,
  ArrowLeftRight,
  Search,
  BarChart3,
  Share2,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import InventoryManager from "../components/InventoryManager";

const Inventory = () => {
  const hospitals = [
    {
      name: "Central Hospital",
      location: "Downtown",
      availableItems: 234,
      status: "Connected",
    },
    {
      name: "Memorial Medical Center",
      location: "Westside",
      availableItems: 156,
      status: "Connected",
    },
    {
      name: "St. Mary's Hospital",
      location: "Eastside",
      availableItems: 189,
      status: "Connected",
    },
  ];

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
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <ArrowLeftRight className="h-10 w-10 text-blue-600" />
            <div>
              <p className="text-gray-600">Active Transfers</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <BarChart3 className="h-10 w-10 text-green-600" />
            <div>
              <p className="text-gray-600">Utilization Rate</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
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
              {hospitals.map((hospital, index) => (
                <tr key={index}>
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
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {hospital.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-teal-600 hover:text-teal-900">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
