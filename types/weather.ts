export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: string;

  humidity: number;
  wind: number;

  chanceOfRain: number; // %
  sunrise: string;     // formatted time
  sunset: string;      // formatted time
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface HourlyWeather {
  time: string;
  temperature: number;
  chanceOfRain: number; // %
}

export interface DailyWeather {
  day: string;
  condition: string;
  maxTemp: number;
  minTemp: number;
  chanceOfRain: number; // %
}

export interface WeatherData {
  city: string;
  coordinates: Coordinates; // ✅ ADD THIS
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}
