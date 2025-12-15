import { WeatherData } from "@/types/weather";
import WeeklyForecastCard from "./WeeklyForecastCard";

interface RightColumnProps {
  weather: WeatherData;
}

export default function RightColumn({ weather }: RightColumnProps) {
  return (
    <div className="bg-[#0f1724] rounded-2xl p-6 border border-white/5">
      <WeeklyForecastCard
      location={weather.city}
      daily={weather.daily}
    />
    </div>
  );
}
