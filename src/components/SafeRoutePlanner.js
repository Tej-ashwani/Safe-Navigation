import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function SafeRoutePlanner() {
  const [startLocation, setStartLocation] = useState([51.505, -0.09]);
  const [endLocation, setEndLocation] = useState([51.515, -0.1]);
  const [route, setRoute] = useState([]);

  const handlePlanRoute = () => {
    const safestRoute = [
      [51.505, -0.09],
      [51.510, -0.095],
      [51.515, -0.1],
    ];
    setRoute(safestRoute);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Safe Route Planner</h2>

      <form className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Start Location</label>
          <input
            type="text"
            placeholder="Enter starting address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Location</label>
          <input
            type="text"
            placeholder="Enter destination"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handlePlanRoute}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Plan Safe Route
        </button>
      </form>

      <MapContainer center={startLocation} zoom={13} className="h-96 w-full rounded-md shadow-md">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {route.length > 0 && <Polyline positions={route} color="green" />}
        <Marker position={startLocation} />
        <Marker position={endLocation} />
      </MapContainer>
    </div>
  );
}

export default SafeRoutePlanner;
