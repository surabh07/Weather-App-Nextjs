const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function formatTime(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function fetchWeatherByCity(city: string) {
  if (!API_KEY) {
    throw new Error("API key missing");
  }

  

  // 1️⃣ Current weather
  const currentRes = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!currentRes.ok) {
    throw new Error("City not found");
  }

  const currentData = await currentRes.json();

  const lat: number = currentData.coord.lat;
  const lng: number = currentData.coord.lon;

  // 2️⃣ Forecast (5-day / 3-hour)
  const forecastRes = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!forecastRes.ok) {
    throw new Error("Forecast fetch failed");
  }

  const forecastData = await forecastRes.json();

  return {
    city: currentData.name,

    coordinates: {
      lat,
      lng,
    },

    current: {
      temperature: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      condition: currentData.weather[0].main,

      humidity: currentData.main.humidity,
      wind: currentData.wind.speed,

      chanceOfRain: Math.round(
        ((forecastData.list[0]?.pop ?? 0) * 100)
      ),

      sunrise: formatTime(currentData.sys.sunrise),
      sunset: formatTime(currentData.sys.sunset),
    },

    hourly: forecastData.list.slice(0, 8).map((hour: any) => ({
      time: formatTime(hour.dt),
      temperature: Math.round(hour.main.temp),
      chanceOfRain: Math.round((hour.pop ?? 0) * 100),
    })),

    daily: forecastData.list
      .filter((_: any, index: number) => index % 8 === 0)
      .slice(0, 7)
      .map((day: any, index: number) => ({
        day:
          index === 0
            ? "Today"
            : new Date(day.dt * 1000).toLocaleDateString([], {
                weekday: "short",
              }),
        condition: day.weather[0].main,
        maxTemp: Math.round(day.main.temp_max),
        minTemp: Math.round(day.main.temp_min),
        chanceOfRain: Math.round((day.pop ?? 0) * 100),
      })),
  };
}
