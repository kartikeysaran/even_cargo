import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Explicitly include Leaflet CSS


const locations = [
  { id: 1, name: 'Chandigarh', lat: 30.7333, lng: 76.7794, details: 'Chandigarh Office' },
  { id: 2, name: 'Ludhiana', lat: 30.9010, lng: 75.8573, details: 'Ludhiana Office' },
  { id: 3, name: 'Jodhpur', lat: 26.2389, lng: 73.0243, details: 'Jodhpur Office' },
  { id: 4, name: 'Ajmer', lat: 26.4499, lng: 74.6399, details: 'Ajmer Office' },
  { id: 5, name: 'Noida', lat: 28.5355, lng: 77.3910, details: 'Noida Office' },
  { id: 6, name: 'New Delhi', lat: 28.6139, lng: 77.2090, details: 'New Delhi Office' },
  { id: 7, name: 'Udaipur', lat: 24.5854, lng: 73.7125, details: 'Udaipur Office' },
  { id: 8, name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, details: 'Ahmedabad Office' },
  { id: 9, name: 'Nagpur', lat: 21.1458, lng: 79.0882, details: 'Nagpur Office' },
  { id: 10, name: 'Hyderabad', lat: 17.3850, lng: 78.4867, details: 'Hyderabad Office' },

  // Add more locations as needed
];


const LocationMap = () => {
    const center = [locations[0].lat, locations[0].lng];
  
    return (
      <MapContainer center={center} zoom={6} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
  
        {locations.map(location => (
          <Marker key={location.id} position={[location.lat, location.lng]}>
            <Popup>{location.details}</Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  };
  
  export default LocationMap;
