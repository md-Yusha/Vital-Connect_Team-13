import React, { ReactNode } from "react";
import { MapContainer, MapContainerProps } from "react-leaflet";

interface MapWrapperProps extends MapContainerProps {
  children: ReactNode;
}

// This is a wrapper component to handle the Context issues with react-leaflet
const MapWrapper: React.FC<MapWrapperProps> = ({ children, ...props }) => {
  return <MapContainer {...props}>{children}</MapContainer>;
};

export default MapWrapper;
