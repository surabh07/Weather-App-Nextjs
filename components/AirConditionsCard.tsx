import Card from "./Card";
import { CurrentWeather } from "@/types/weather";

interface AirConditionsCardProps {
  current: CurrentWeather;
}

export default function AirConditionsCard({
  current,
}: AirConditionsCardProps) {
  return (
    <Card title="Air Conditions">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Real Feel
          </p>
          <p className="text-2xl font-semibold mt-1">
            {current.feelsLike}°
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Wind
          </p>
          <p className="text-2xl font-semibold mt-1">
            {current.wind} km/h
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Humidity
          </p>
          <p className="text-2xl font-semibold mt-1">
            {current.humidity}%
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Rain
          </p>
          <p className="text-2xl font-semibold mt-1">
            {current.chanceOfRain}%
          </p>
        </div>
      </div>
    </Card>
  );
}
