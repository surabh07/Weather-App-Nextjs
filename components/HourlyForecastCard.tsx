import Card from "./Card";
import { HourlyWeather } from "@/types/weather";

interface HourlyForecastCardProps {
  hourly: HourlyWeather[];
}

export default function HourlyForecastCard({
  hourly,
}: HourlyForecastCardProps) {
  return (
    <div >
    <Card title="Today's Forecast">
      <div className="flex gap-6 overflow-x-auto">
        {hourly.map((hour) => (
          <div
            key={hour.time}
            className="min-w-70px text-center"
          >
            <p className="text-xs text-gray-400">
              {hour.time}
            </p>
            <p className="mt-2 text-sm font-semibold">
              {hour.temperature}°
            </p>
          </div>
        ))}
      </div>
    </Card>
    </div>
  );
}
