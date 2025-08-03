import React, { useState, useEffect } from 'react';
// 1. Import the correct components: APIProvider, Map, and AdvancedMarker
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const containerStyle = {
  width: '100%',
  height: '100%',
};


const defaultCenter = {
  lat: -3.745,
  lng: -38.523
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        setCurrentPosition(defaultCenter); 
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []); 

  if (!currentPosition) {
    return <div>Getting your location...</div>;
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API}>
      <Map
        style={containerStyle} 
        center={currentPosition}
        zoom={17}
        mapId="AIzaSyD7hBvQXc2VXWNuodHzEYPvVOeQ8C1ulU0" 
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <AdvancedMarker position={currentPosition} />
      </Map>
    </APIProvider>
  );
};

export default LiveTracking;
