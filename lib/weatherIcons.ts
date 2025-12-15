export function getWeatherIcon(condition: string) {
  const key = condition.toLowerCase();

  if (key.includes("cloud")) return "/icons/cloudy.png";
  if (key.includes("rain")) return "/icons/rain.png";
  if (key.includes("snow")) return "/icons/snow.png";
  if (key.includes("smoke")) return "/icons/smoke.png";
  if (key.includes("storm") || key.includes("thunder"))
    return "/icons/thunder.png";

  return "/icons/clear.png";
}
