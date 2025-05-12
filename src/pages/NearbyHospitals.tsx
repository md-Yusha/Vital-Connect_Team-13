import { useState, useEffect } from "react";
import { hospitalApi } from "../services/api";
import { Loader, AlertCircle, Building2 } from "lucide-react";
import CustomMapWithMarkers from "../components/CustomMapWithMarkers";

interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  phone_number: string;
  email: string;
}

// We don't need the SetViewOnUserLocation component anymore as our CustomMapWithMarkers handles this

const NearbyHospitals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Fetch hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await hospitalApi.getAll();
        const hospitalsData = response.data.results || [];

        // Filter hospitals that have latitude and longitude
        const hospitalsWithLocation = hospitalsData.filter(
          (hospital: Partial<Hospital>) =>
            hospital &&
            typeof hospital === "object" &&
            hospital.latitude &&
            hospital.longitude
        );

        setHospitals(hospitalsWithLocation);
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        setError("Failed to load hospitals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  // Sort hospitals by distance from user
  const sortedHospitals = userLocation
    ? [...hospitals].sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation[0],
          userLocation[1],
          a.latitude,
          a.longitude
        );
        const distanceB = calculateDistance(
          userLocation[0],
          userLocation[1],
          b.latitude,
          b.longitude
        );
        return distanceA - distanceB;
      })
    : hospitals;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Nearby Hospitals & Clinics
        </h1>
        <p className="text-lg text-gray-600">
          Find healthcare facilities in your area
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader className="h-12 w-12 text-teal-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading nearby hospitals...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-lg">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[600px]">
              {userLocation && (
                <div style={{ height: "100%", width: "100%" }}>
                  <CustomMapWithMarkers
                    center={userLocation}
                    zoom={13}
                    hospitals={hospitals}
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Hospital list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Hospitals Near You
                </h2>
              </div>

              <div className="overflow-y-auto max-h-[540px]">
                {sortedHospitals.length > 0 ? (
                  sortedHospitals.map((hospital) => {
                    const distance = userLocation
                      ? calculateDistance(
                          userLocation[0],
                          userLocation[1],
                          hospital.latitude,
                          hospital.longitude
                        )
                      : null;

                    return (
                      <div
                        key={hospital.id}
                        className="p-4 border-b border-gray-200 hover:bg-gray-50"
                      >
                        <h3 className="font-semibold text-gray-900">
                          {hospital.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {hospital.address}
                        </p>
                        <p className="text-sm text-gray-600">
                          {hospital.city}, {hospital.state}
                        </p>
                        {distance !== null && (
                          <p className="text-sm font-medium text-teal-600 mt-1">
                            {distance < 1
                              ? `${(distance * 1000).toFixed(0)} meters away`
                              : `${distance.toFixed(1)} km away`}
                          </p>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      No hospitals found in your area
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyHospitals;
