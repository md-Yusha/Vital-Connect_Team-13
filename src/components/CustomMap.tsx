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

interface CustomMapProps {
  center: [number, number];
  zoom: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  markerPosition?: [number, number] | null;
  style?: React.CSSProperties;
}

const CustomMap: React.FC<CustomMapProps> = ({
  center,
  zoom,
  onLocationSelect,
  markerPosition,
  style = { height: "100%", width: "100%" },
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

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

      // Add click handler if onLocationSelect is provided
      if (onLocationSelect) {
        map.on("click", (e: L.LeafletMouseEvent) => {
          const { lat, lng } = e.latlng;
          onLocationSelect(lat, lng);
        });
      }

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
  }, [center, zoom, onLocationSelect]);

  // Handle marker position changes
  useEffect(() => {
    if (!leafletMapRef.current) return;

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    // Add new marker if position is provided
    if (markerPosition) {
      markerRef.current = L.marker(markerPosition, { icon: DefaultIcon }).addTo(
        leafletMapRef.current
      );
    }
  }, [markerPosition]);

  return <div ref={mapRef} style={style}></div>;
};

export default CustomMap;
