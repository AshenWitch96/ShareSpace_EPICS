"use client";

import React, { useState } from "react";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: marketIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const scrollbarColor = "#5d9ca4";

interface MapProps {
  center?: LatLngTuple;
}

const SearchControl: React.FC<{ setCenter: (coords: LatLngTuple) => void; setZoom: (zoom: number) => void }> = ({ setCenter, setZoom }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; lat: number; lon: number }[]>([]);
  const map = useMap();

  const fetchSuggestions = async (query: string) => {
    if (!query) return setSuggestions([]);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await response.json();

    setSuggestions(
      data.map((place: any) => ({
        name: place.display_name,
        lat: parseFloat(place.lat),
        lon: parseFloat(place.lon),
      }))
    );
  };

  const handleSelect = (lat: number, lon: number, name: string) => {
    setQuery(name);
    setSuggestions([]);
    const newCenter: LatLngTuple = [lat, lon];
    setCenter(newCenter);
    setZoom(15); // Zoom in when a location is selected
    map.setView(newCenter, 15);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await response.json();

    if (data.length > 0) {
      handleSelect(parseFloat(data[0].lat), parseFloat(data[0].lon), data[0].display_name);
    }
  };

  return (
    <div className="absolute top-2 right-2 bg-white p-1 rounded-lg shadow-md w-56">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          placeholder="Search any place..."
          className="border p-1 text-sm w-full rounded outline-none"
        />
      </form>
      {suggestions.length > 0 && (
        <ul className="bg-white border rounded shadow-lg mt-1 max-h-32 overflow-auto custom-scrollbar">
          {suggestions.map((s, index) => (
            <li
              key={index}
              onClick={() => handleSelect(s.lat, s.lon, s.name)}
              className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Map: React.FC<MapProps> = ({ center }) => {
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(center || [20, 77]); // India Center
  const [zoomLevel, setZoomLevel] = useState(7);

  return (
    <div className="relative h-full rounded-lg">
      <style>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-thumb {
          background: ${scrollbarColor};
          border-radius: 3px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
      `}</style>

      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControl setCenter={setMapCenter} setZoom={setZoomLevel} />
        <Marker position={mapCenter} />
      </MapContainer>
    </div>
  );
};

export default Map;
