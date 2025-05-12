import React, { useState, useEffect } from "react";
import { Building2, MapPin, Phone, Mail, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomMap from "../components/CustomMap";
import authService, { RegisterHospitalData } from "../services/auth";

interface ClinicFormData {
  clinicName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactPerson: string;
  licenseNumber: string;
  latitude: number | null;
  longitude: number | null;
}

// This component was removed as it's not being used

// We don't need the LocationMarker component anymore as our CustomMap handles this

const RegisterClinic = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ClinicFormData>({
    clinicName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactPerson: "",
    licenseNumber: "",
    latitude: null,
    longitude: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to a central location if geolocation fails
          setUserLocation([37.7749, -122.4194]); // San Francisco
        }
      );
    }
  }, []);

  const handlePositionChange = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    setFormData({
      ...formData,
      latitude: lat,
      longitude: lng,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    // Validate location selection
    if (!formData.latitude || !formData.longitude) {
      setError("Please select your location on the map");
      setIsSubmitting(false);
      return;
    }

    try {
      // Map frontend field names to backend field names
      const hospitalData: RegisterHospitalData = {
        name: formData.clinicName.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zip_code: formData.zipCode.trim(),
        phone_number: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        password: formData.password,
        contact_person: formData.contactPerson.trim(),
        license_number: formData.licenseNumber.trim(),
        latitude: formData.latitude,
        longitude: formData.longitude,
      };

      // Register hospital with authentication
      const response = await authService.register(hospitalData);
      console.log("Hospital registered successfully:", response);

      // Show success message
      setSuccess(true);

      // Reset form after submission
      setFormData({
        clinicName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactPerson: "",
        licenseNumber: "",
        latitude: null,
        longitude: null,
      });

      // Redirect to inventory page after 2 seconds
      setTimeout(() => {
        navigate("/inventory");
      }, 2000);
    } catch (err) {
      console.error("Error registering hospital:", err);
      setError("Failed to register clinic. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Register Your Clinic
          </h1>
          <p className="text-lg text-gray-600">
            Join our network of healthcare providers to manage your inventory
            efficiently.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clinic Name */}
            <div>
              <label
                htmlFor="clinicName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Clinic Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="clinicName"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter clinic name"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter street address"
                  required
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter city"
                required
              />
            </div>

            {/* State */}
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter state"
                required
              />
            </div>

            {/* ZIP Code */}
            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter ZIP code"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Contact Person */}
            <div>
              <label
                htmlFor="contactPerson"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Person
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter contact person name"
                  required
                />
              </div>
            </div>

            {/* License Number */}
            <div>
              <label
                htmlFor="licenseNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                License Number
              </label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter license number"
                required
              />
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Your Location on Map
            </label>
            <div className="h-96 rounded-lg overflow-hidden border border-gray-300">
              {userLocation && (
                <div className="h-full w-full">
                  <CustomMap
                    center={userLocation}
                    zoom={13}
                    onLocationSelect={handlePositionChange}
                    markerPosition={position}
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              )}
            </div>
            {position && (
              <p className="mt-2 text-sm text-gray-600">
                Selected location: {position[0].toFixed(6)},{" "}
                {position[1].toFixed(6)}
              </p>
            )}
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                Clinic registered successfully! Redirecting to inventory page...
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 bg-teal-600 text-white rounded-lg transition-colors ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-teal-700"
              }`}
            >
              {isSubmitting ? "Registering..." : "Register Clinic"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterClinic;
