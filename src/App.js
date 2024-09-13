import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import SafetyMap from './components/SafetyMap';
import SafeRoutePlanner from './components/SafeRoutePlanner';

function App() {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between">
          <div className="text-white font-bold text-xl">Safety Navigator</div>
          <div className="flex space-x-4">
            <NavLink to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
              Safety Map
            </NavLink>
            <NavLink to="/route-planner" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
              Safe Route Planner
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-8 p-4">
        <Routes>
          <Route path="/" element={<SafetyMap />} />
          <Route path="/route-planner" element={<SafeRoutePlanner />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
