import { title } from "process";
import Card from "./Card";
import { DailyWeather } from "@/types/weather";

interface WeeklyForecastCardProps {
  location: string;
  daily: DailyWeather[];
}

export default function WeeklyForecastCard({
  location,
  daily,
}: WeeklyForecastCardProps) {
  return (
    <Card>
      <div className="space-y-6">
        <p className="mb-4 text-m font-bold">7-DAY FORECAST</p>
      <p className="mb-4 text-s text-gray-400">
        Forecast for: {location}
      </p>

      <ul className="flex flex-col gap-4">
        {daily.map((day) => (
          <li
            key={day.day}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-gray-400">
              {day.day}
            </span>
            <span>{day.condition}</span>
            <span className="font-semibold">
              {day.maxTemp}° / {day.minTemp}°
            </span>
          </li>
        ))}
      </ul>
      </div>
    </Card>
  );
}
