import { getWeatherIcon } from "@/lib/weatherIcons";
import Card from "./Card";
import { WeatherData } from "@/types/weather";
import Image from "next/image";

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
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-5xl text-white-400">{weather.city}</p>
          <p className="text-s text-gray-500">{weather.current.condition}</p>
        </div>

        <button
          onClick={() =>
            isFavourite
              ? onRemoveFavourite(weather.city)
              : onAddFavourite(weather.city)
          }
          className="text-yellow-400 hover:scale-110 transition"
        >
          {isFavourite ? <StarIcon /> : <StarBorderIcon />}
        </button>
      </div>

      <div className="mt-6 mb-10 flex items-center justify-between">
        <div className="text-6xl font-bold text-white">
          {weather.current.temperature}°
        </div>

        <Image
          src={getWeatherIcon(weather.current.condition)}
          alt={weather.current.condition}
          width={90}
          height={90}
          className="opacity-90"
        />
      </div>


      {/* Extra info */}
      <div className="mt-20 grid grid-cols-4 gap-4 text-xs text-gray-400">
        <div>
          <p className="text-lg">Rain</p>
          <p className="text-lg text-white">{weather.current.chanceOfRain}%</p>
        </div>

        <div>
          <p className="text-lg">Sunrise</p>
          <p className="text-lg text-white">{weather.current.sunrise}</p>
        </div>

        <div>
          <p className="text-lg">Sunset</p>
          <p className="text-lg text-white">{weather.current.sunset}</p>
        </div>

        <div>
          <p className="text-lg text-white">
            Feels like 
          </p>
          <p className="text-lg text-white">
            {weather.current.feelsLike}°
          </p>
        </div>
      </div>
    </Card>
  );
}
