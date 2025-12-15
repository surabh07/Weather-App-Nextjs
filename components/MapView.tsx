"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/lib/leafletIcon";

interface MapViewProps {
  lat: number;
  lng: number;
  onLocationChange: (lat: number, lng: number) => void;
}

// 🔥 Forces Leaflet to recalculate size after render
function ResizeFix() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [map]);

  return null;
}

function MapClickHandler({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

export default function MapView({
  lat,
  lng,
  onLocationChange,
}: MapViewProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={8}
      style={{ height: "100%", width: "100%" }}
    >
      <ResizeFix />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={[lat, lng]} />

      <MapClickHandler onLocationChange={onLocationChange} />
    </MapContainer>
  );
}
