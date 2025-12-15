import { WeatherData } from "@/types/weather";
import CurrentWeatherCard from "./CurrentWeatherCard";
import HourlyForecastCard from "./HourlyForecastCard";
import AirConditionsCard from "./AirConditionsCard";
import Image from "next/image";
import { getWeatherIcon } from "@/lib/weatherIcons";


interface LeftColumnProps {
  weather: WeatherData;
  favourites: string[];
  onAddFavourite: (city: string) => void;
  onRemoveFavourite: (city: string) => void;
}

export default function LeftColumn({
  weather,
  favourites,
  onAddFavourite,
  onRemoveFavourite,
}: LeftColumnProps) {
  return (
    <div className="bg-[#0f1724] rounded-2xl p-6 border border-white/5">
      <CurrentWeatherCard
        weather={weather}
        favourites={favourites}
        onAddFavourite={onAddFavourite}
        onRemoveFavourite={onRemoveFavourite}
      />

      <HourlyForecastCard hourly={weather.hourly} />

      {/* ✅ PASS current weather, NOT air */}
      <AirConditionsCard current={weather.current} />
    </div>
  );
}
