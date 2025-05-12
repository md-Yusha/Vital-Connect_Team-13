import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Create a custom icon
const DefaultIcon = new L.Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  phone_number: string;
}

interface CustomMapWithMarkersProps {
  center: [number, number];
  zoom: number;
  hospitals: Hospital[];
  style?: React.CSSProperties;
}

const CustomMapWithMarkers: React.FC<CustomMapWithMarkersProps> = ({
  center,
  zoom,
  hospitals,
  style = { height: "100%", width: "100%" },
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize the map
  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current) {
      // Create the map
      const map = L.map(mapRef.current).setView(center, zoom);

      // Add the tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add user location marker
      L.marker(center, { icon: DefaultIcon })
        .bindPopup("Your location")
        .addTo(map);

      // Store the map instance
      leafletMapRef.current = map;
    }

    // Cleanup function
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [center, zoom]);

  // Handle hospital markers
  useEffect(() => {
    if (!leafletMapRef.current) return;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add hospital markers
    hospitals.forEach((hospital) => {
      const position: [number, number] = [
        hospital.latitude,
        hospital.longitude,
      ];
      const marker = L.marker(position, { icon: DefaultIcon })
        .bindPopup(
          `
          <div>
            <h3 style="font-weight: bold;">${hospital.name}</h3>
            <p>${hospital.address}</p>
            <p>${hospital.city}, ${hospital.state}</p>
            <p>Phone: ${hospital.phone_number}</p>
          </div>
        `
        )
        .addTo(leafletMapRef.current!);

      markersRef.current.push(marker);
    });
  }, [hospitals]);

  return <div ref={mapRef} style={style}></div>;
};

export default CustomMapWithMarkers;
