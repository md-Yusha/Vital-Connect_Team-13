# Map Implementation: Challenges and Solutions

This document details the specific challenges encountered with the map implementation in the Vital Connect application and the solutions developed to address them. This case study demonstrates problem-solving approaches and technical decision-making in the face of compatibility issues.

## The Challenge

### Initial Implementation

Our initial approach was to use react-leaflet, a popular React wrapper for the Leaflet mapping library, to implement two key features:

1. **Clinic Registration Map**: Allowing healthcare facilities to select their precise location
2. **Nearby Hospitals Finder**: Displaying healthcare facilities in the user's vicinity

We implemented these features using:

- react-leaflet v5.0.0
- Leaflet v1.9.4
- React v18.3.1

### Encountered Issues

When testing the application, we encountered several critical issues:

1. **Blank Screen After Location Access**: After allowing location access, the map would not render and the screen would go blank

2. **Console Errors**:

   ```
   Warning: Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?
   ```

   ```
   Warning: A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function.
   ```

   ```
   TypeError: render2 is not a function. (In 'render2(newValue)', 'render2' is an instance of Array)
   ```

3. **React Router Warnings**:

   ```
   ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7.
   ```

   ```
   ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7.
   ```

### Root Cause Analysis

After investigation, we identified the following root causes:

1. **Version Incompatibility**: react-leaflet v5.0.0 requires React 19.0.0, but our project was using React 18.3.1

2. **Context API Implementation**: The way react-leaflet used React's Context API was incompatible with our React version

3. **React Router Future Changes**: Our version of React Router was warning about upcoming changes in v7

## Solution Exploration

### Attempted Solutions

We explored several potential solutions:

1. **Downgrading react-leaflet**: We attempted to use react-leaflet v4.2.1, which is compatible with React 18

2. **Creating a Custom Wrapper**: We developed a `MapWrapper` component to try to isolate the Context issues

3. **Explicit Icon Configuration**: We ensured proper configuration of Leaflet icons, which is a common source of issues

Despite these attempts, we continued to encounter Context-related errors that prevented the maps from rendering properly.

## The Final Solution

### Custom Map Components

We ultimately decided to bypass react-leaflet entirely and implement custom map components using the Leaflet library directly:

1. **CustomMap.tsx**: A simple map component for location selection

   ```typescript
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
       // Marker update logic
     }, [markerPosition]);

     return <div ref={mapRef} style={style}></div>;
   };
   ```

2. **CustomMapWithMarkers.tsx**: An enhanced map component for displaying multiple locations

   ```typescript
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
       // Map initialization logic
     }, [center, zoom]);

     // Handle hospital markers
     useEffect(() => {
       // Markers update logic
     }, [hospitals]);

     return <div ref={mapRef} style={style}></div>;
   };
   ```

### React Router Future Flags

To address the React Router warnings, we added future flags to our Router configuration:

```tsx
<Router
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
>
  {/* Router content */}
</Router>
```

## Implementation Process

### Step 1: Create Custom Map Components

We developed the custom map components using vanilla Leaflet, ensuring they provided all the functionality we needed:

- Location selection via clicking
- Marker display
- Multiple markers with popups
- Proper cleanup to prevent memory leaks

### Step 2: Update Component Usage

We replaced all instances of react-leaflet components with our custom components:

**Before:**

```tsx
<MapContainer
  center={userLocation}
  zoom={13}
  scrollWheelZoom={true}
  style={{ height: "100%", width: "100%" }}
>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <LocationMarker setPosition={handlePositionChange} />
  {position && <Marker position={position} icon={DefaultIcon} />}
</MapContainer>
```

**After:**

```tsx
<CustomMap
  center={userLocation}
  zoom={13}
  onLocationSelect={handlePositionChange}
  markerPosition={position}
  style={{ height: "100%", width: "100%" }}
/>
```

### Step 3: Add React Router Future Flags

We updated the Router configuration to opt into future behavior:

```tsx
<Router
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
>
  {/* Application routes */}
</Router>
```

## Results

Our solution successfully resolved all the issues:

1. **Maps Render Correctly**: Both the clinic registration map and nearby hospitals map now render properly
2. **No Context Errors**: The console errors related to React Context were eliminated
3. **No React Router Warnings**: The future flags addressed the React Router warnings
4. **Improved Performance**: The direct Leaflet implementation is more efficient than the react-leaflet wrapper
5. **Better Control**: We now have more direct control over the map behavior and appearance

## Lessons Learned

This challenge taught us several valuable lessons:

1. **Library Compatibility**: Always check version compatibility between libraries, especially when using wrappers around established libraries

2. **Direct Implementation**: Sometimes it's better to use a library directly rather than through a wrapper, especially when facing compatibility issues

3. **React Context Complexity**: React's Context API can be a source of compatibility issues between different React versions and libraries

4. **Future-Proofing**: Opt into future behavior when libraries provide the option, to avoid migration issues later

5. **Custom Components**: Building custom components that encapsulate third-party libraries can provide better control and isolation

## Conclusion

The map implementation challenge in Vital Connect demonstrates how technical obstacles can be overcome through careful analysis, exploration of alternatives, and custom development when necessary. By creating our own map components using Leaflet directly, we were able to deliver a reliable and performant mapping experience for our users while avoiding the compatibility issues with react-leaflet.

This approach not only solved our immediate problem but also gave us more control over the map functionality and appearance, allowing for future customization and enhancement without being constrained by the limitations of a wrapper library.

---

This case study was prepared to document the challenges and solutions related to map implementation in the Vital Connect application. It serves as both a technical reference and a demonstration of problem-solving approaches in software development.
