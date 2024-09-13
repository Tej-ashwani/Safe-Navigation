import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Heatmap from 'heatmap.js';
import L from 'leaflet';
import Spinner from './Spinner'; // Import Spinner component

function SafetyMap() {
  const [heatMapData, setHeatMapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const data = [
        { lat: 51.505, lng: -0.09, value: 0.7, score: 75 },
        { lat: 51.515, lng: -0.1, value: 0.5, score: 60 },
        { lat: 51.525, lng: -0.12, value: 0.9, score: 85 },
      ];
      setHeatMapData(data);
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
      const heatmapInstance = Heatmap.create({
        container: document.querySelector('.leaflet-container'),
        radius: 30,
        maxOpacity: 0.6,
        minOpacity: 0.1,
        blur: 0.75,
        gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' }
      });

      const heatMapPoints = heatMapData.map((point) => ({
        x: point.lat,
        y: point.lng,
        value: point.value,
      }));

      heatmapInstance.setData({
        max: 1,
        data: heatMapPoints,
      });
    }
  }, [loading, heatMapData]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Real-Time Safety Map</h2>
      <p className="text-gray-500 mb-4">View safety scores across different neighborhoods and streets. Data updates in real-time.</p>

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <MapContainer center={[51.505, -0.09]} zoom={13} className="h-96 w-full rounded-md shadow-md">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {heatMapData.map((point, index) => (
            <Marker
              key={index}
              position={[point.lat, point.lng]}
              eventHandlers={{
                click: () => {
                  setSelectedArea(point);
                },
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Safety Score: {point.score}</h3>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {selectedArea && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700">Selected Area Details</h3>
          <p><strong>Latitude:</strong> {selectedArea.lat}</p>
          <p><strong>Longitude:</strong> {selectedArea.lng}</p>
          <p><strong>Safety Score:</strong> {selectedArea.score}</p>
        </div>
      )}
    </div>
  );
}

export default SafetyMap;
