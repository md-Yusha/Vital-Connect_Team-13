# Map Implementation Documentation

This document provides detailed information about the map implementation in the Vital Connect application, including the challenges faced, solutions implemented, and technical details.

## Table of Contents

- [Overview](#overview)
- [Challenges Encountered](#challenges-encountered)
- [Solution Architecture](#solution-architecture)
- [Component Details](#component-details)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)

## Overview

The Vital Connect application uses interactive maps for two primary features:

1. **Clinic Registration**: Allowing healthcare facilities to select their precise location during registration
2. **Nearby Hospitals Finder**: Enabling users to find healthcare facilities in their vicinity

Initially, we implemented these features using react-leaflet, a React wrapper for the Leaflet mapping library. However, we encountered compatibility issues between react-leaflet v5.0.0 and React 18.3.1, which led us to develop a custom solution.

## Challenges Encountered

### React Context Issues

When using react-leaflet v5.0.0 with React 18.3.1, we encountered the following errors:

```
Warning: Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?
```

```
Warning: A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function.
```

```
TypeError: render2 is not a function. (In 'render2(newValue)', 'render2' is an instance of Array)
```

These errors occurred because:

1. react-leaflet v5.0.0 requires React 19.0.0
2. The Context API implementation in react-leaflet was incompatible with React 18.3.1
3. The errors resulted in a blank screen after allowing location access

### React Router Warnings

We also encountered warnings related to future changes in React Router v7:

```
⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7.
```

```
⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7.
```

## Solution Architecture

To resolve these issues, we implemented a two-part solution:

1. **Custom Map Components**: Created vanilla JavaScript Leaflet implementations that bypass react-leaflet entirely
2. **React Router Future Flags**: Added configuration to opt into future React Router behavior

### Map Component Architecture

We developed two custom map components:

1. **CustomMap.tsx**: A simple map component for location selection
2. **CustomMapWithMarkers.tsx**: An enhanced map component for displaying multiple markers

Both components use the Leaflet library directly, avoiding the React Context issues encountered with react-leaflet.

## Component Details

### CustomMap Component

The `CustomMap` component is designed for simple map interactions, particularly for selecting a location during clinic registration.

```typescript
interface CustomMapProps {
  center: [number, number];
  zoom: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  markerPosition?: [number, number] | null;
  style?: React.CSSProperties;
}
```

Key features:

- Initializes a Leaflet map with the specified center and zoom level
- Handles click events to select a location (if `onLocationSelect` is provided)
- Displays a marker at the selected position (if `markerPosition` is provided)
- Properly cleans up resources when unmounted

### CustomMapWithMarkers Component

The `CustomMapWithMarkers` component extends the functionality to display multiple markers, used in the Nearby Hospitals feature.

```typescript
interface CustomMapWithMarkersProps {
  center: [number, number];
  zoom: number;
  hospitals: Hospital[];
  style?: React.CSSProperties;
}
```

Key features:

- Displays the user's current location
- Shows markers for all nearby hospitals
- Provides popups with detailed information for each hospital
- Efficiently updates markers when the hospital data changes

### Icon Handling

Both components properly handle Leaflet's icon system, which is a common source of issues:

```typescript
const DefaultIcon = new L.Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
```

## Usage Examples

### Clinic Registration

```tsx
<CustomMap
  center={userLocation}
  zoom={13}
  onLocationSelect={handlePositionChange}
  markerPosition={position}
  style={{ height: "100%", width: "100%" }}
/>
```

### Nearby Hospitals Finder

```tsx
<CustomMapWithMarkers
  center={userLocation}
  zoom={13}
  hospitals={hospitals}
  style={{ height: "100%", width: "100%" }}
/>
```

## Best Practices

Based on our experience implementing these map components, we recommend the following best practices:

1. **Direct Library Usage**: When facing compatibility issues with wrapper libraries, consider using the underlying library directly
2. **Clean Lifecycle Management**: Ensure proper cleanup of map instances to prevent memory leaks
3. **Icon Management**: Always explicitly configure Leaflet icons to avoid the common "missing marker icon" issue
4. **Performance Optimization**: Use refs to store and update map instances instead of recreating them
5. **Responsive Design**: Ensure map containers have explicit dimensions (height and width)
6. **Error Handling**: Implement proper error boundaries around map components to prevent application crashes

## Future Improvements

Potential enhancements for the map implementation:

1. **Clustering**: Implement marker clustering for better performance with many markers
2. **Custom Markers**: Create specialized markers for different types of healthcare facilities
3. **Routing**: Add directions and routing capabilities
4. **Offline Support**: Implement tile caching for limited offline functionality
5. **Accessibility**: Enhance keyboard navigation and screen reader support

---

This documentation was last updated on May 12, 2024.
