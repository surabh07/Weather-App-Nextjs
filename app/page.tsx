"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useFavourites } from "@/hooks/useFavourites";
import { fetchWeatherByCity } from "@/services/weatherService";
import { reverseGeocode } from "@/services/geocodingService";
import { WeatherData } from "@/types/weather";

import AppShell from "@/components/AppShell";
import Sidebar from "@/components/Sidebar";
import LeftColumn from "@/components/LeftColumn";
import RightColumn from "@/components/RightColumn";
import SearchBar from "@/components/SearchBar";

// ✅ Leaflet client-only
const MapView = dynamic(
  () => import("@/components/MapView"),
  { ssr: false }
);

export default function Home() {
  // ---------------- CITY + WEATHER ----------------
  const [selectedCity, setSelectedCity] = useState("Vadodara");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- MAP ----------------
  const [coordinates, setCoordinates] = useState({
    lat: 40.4168,
    lng: -3.7038,
  });

  const [mapLoading, setMapLoading] = useState(false);

  // ---------------- FAVOURITES ----------------
  const { favourites, addFavourite, removeFavourite } = useFavourites();

  // ---------------- FETCH WEATHER ----------------
  useEffect(() => {
    if (!selectedCity.trim()) return;

    async function loadWeather() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchWeatherByCity(selectedCity);
        setWeather(data);

        setCoordinates({
          lat: data.coordinates.lat,
          lng: data.coordinates.lng,
        });
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [selectedCity]);

  // ---------------- MAP CLICK HANDLER ----------------
  const handleMapLocationChange = async (lat: number, lng: number) => {
    try {
      setMapLoading(true);
      setCoordinates({ lat, lng });

      const city = await reverseGeocode(lat, lng);
      setSelectedCity(city);
    } catch (err) {
      console.error(err);
    } finally {
      setMapLoading(false);
    }
  };

  return (
    <AppShell>
      <Sidebar />

      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
        {/* SEARCH */}
        <SearchBar
          location={selectedCity}
          onLocationChange={setSelectedCity}
        />

        {/* FAVOURITES */}
        {favourites.length > 0 && (
          <div className="mb-6 flex gap-3 flex-wrap">
            {favourites.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`text-xs px-3 py-1 rounded-full 
                  ${
                    city === selectedCity
                      ? "bg-blue-500 text-white"
                      : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
                  }`}
              >
                {city}
              </button>
            ))}
          </div>
        )}

        {loading && <p className="text-gray-400">Loading weather...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {weather && !loading && !error && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <LeftColumn
                  weather={weather}
                  favourites={favourites}
                  onAddFavourite={addFavourite}
                  onRemoveFavourite={removeFavourite}
                />
              </div>

              <div>
                <RightColumn weather={weather} />
              </div>
            </div>

            {/* MAP */}
            <div className="mt-10">
              <h2 className="mb-2 text-sm uppercase tracking-widest text-gray-400">
                Location Map
              </h2>

              {mapLoading && (
                <p className="text-xs text-gray-500 mb-2">
                  Detecting location...
                </p>
              )}

              <div className="h-[420px] rounded-2xl overflow-hidden bg-[#0f1724]">
                <MapView
                  lat={coordinates.lat}
                  lng={coordinates.lng}
                  onLocationChange={handleMapLocationChange}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </AppShell>
  );
}
