import Image from "next/image";
import { getWeatherIcon } from "@/lib/weatherIcons";
import Card from "./Card";
import { WeatherData } from "@/types/weather";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface CurrentWeatherCardProps {
  weather: WeatherData;
  favourites: string[];
  onAddFavourite: (city: string) => void;
  onRemoveFavourite: (city: string) => void;
}

export default function CurrentWeatherCard({
  weather,
  favourites,
  onAddFavourite,
  onRemoveFavourite,
}: CurrentWeatherCardProps) {
  const isFavourite = favourites.includes(weather.city);

  return (
    <Card>
      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-3xl md:text-4xl lg:text-5xl font-medium text-white">
            {weather.city}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {weather.current.condition}
          </p>
        </div>

        <button
          onClick={() =>
            isFavourite
              ? onRemoveFavourite(weather.city)
              : onAddFavourite(weather.city)
          }
          className="text-yellow-400 hover:scale-110 transition"
          aria-label="Toggle favourite"
        >
          {isFavourite ? <StarIcon /> : <StarBorderIcon />}
        </button>
      </div>

      {/* ================= HERO ================= */}
      <div className="mt-8 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-gray-400">
            Temperature
          </p>
          <p className="text-5xl md:text-6xl font-bold text-white mt-1">
            {weather.current.temperature}°C
          </p>
        </div>

        <Image
          src={getWeatherIcon(weather.current.condition)}
          alt={weather.current.condition}
          width={64}
          height={64}
          className="md:w-[80px] md:h-[80px] opacity-90"
        />
      </div>

      {/* ================= EXTRA INFO ================= */}
      <div className="mt-8">
        <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-4">
          Details
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InfoItem label="Rain" value={`${weather.current.chanceOfRain}%`} />
          <InfoItem label="Sunrise" value={weather.current.sunrise} />
          <InfoItem label="Sunset" value={weather.current.sunset} />
          <InfoItem
            label="Feels Like"
            value={`${weather.current.feelsLike}°C`}
          />
        </div>
      </div>
    </Card>
  );
}

/* ================= SUB COMPONENT ================= */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white/5 rounded-xl p-3">
      <p className="text-[11px] uppercase tracking-widest text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm md:text-base font-medium text-white">
        {value}
      </p>
    </div>
  );
}
