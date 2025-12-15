const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const GEO_URL = "https://api.openweathermap.org/geo/1.0/reverse";

interface ReverseGeocodeResponse {
  name: string;
  country: string;
  state?: string;
}

export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  const res = await fetch(
    `${GEO_URL}?lat=${lat}&lon=${lng}&limit=1&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to reverse geocode location");
  }

  const data: ReverseGeocodeResponse[] = await res.json();

  if (!data.length) {
    throw new Error("No location found");
  }

  return data[0].name; // city name
}
