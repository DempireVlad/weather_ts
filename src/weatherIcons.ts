import drizzle from "./assets/icons/icon-drizzle.webp";
import fog from "./assets/icons/icon-fog.webp";
import rain from "./assets/icons/icon-rain.webp";
import snow from "./assets/icons/icon-snow.webp";
import sunny from "./assets/icons/icon-sunny.webp";
import thunderstorm from "./assets/icons/icon-storm.webp";
import overcast from "./assets/icons/icon-overcast.webp";
import partlyCloudy from "./assets/icons/icon-partly-cloudy.webp";




export const weatherIcons = {
  0: sunny,
  1: sunny,

  2: partlyCloudy,
  3: overcast,

  45: fog,
  48: fog,

  51: drizzle,
  53: drizzle,
  55: rain,

  61: rain,
  63: rain,
  65: rain,

  71: snow,
  73: snow,
  75: snow,

  95: thunderstorm,
  96: thunderstorm,
  99: thunderstorm,
};

export const getWeatherIcon = (code: number) =>
  weatherIcons[code as keyof typeof weatherIcons] ?? sunny;