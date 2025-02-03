import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Moon,
  MoveDown,
  MoveDownLeft,
  MoveDownRight,
  MoveLeft,
  MoveRight,
  MoveUp,
  MoveUpLeft,
  MoveUpRight,
  Sun,
} from 'lucide-react';
import windrose from 'windrose';

export const getWindDirection = (degress) => {
  const windDirection = windrose.getPoint(degress, { depth: 1 }).symbol;

  if (windDirection === 'N') return { name: 'С', icon: MoveDown };
  if (windDirection === 'NE') return { name: 'СВ', icon: MoveDownLeft };
  if (windDirection === 'E') return { name: 'В', icon: MoveLeft };
  if (windDirection === 'SE') return { name: 'ЮВ', icon: MoveUpLeft };
  if (windDirection === 'S') return { name: 'Ю', icon: MoveUp };
  if (windDirection === 'SW') return { name: 'ЮЗ', icon: MoveUpRight };
  if (windDirection === 'W') return { name: 'З', icon: MoveRight };
  if (windDirection === 'NW') return { name: 'СЗ', icon: MoveDownRight };
};

export const getCurrentWeather = (weatherList, unixOffset) => {
  return weatherList.find((obj) => obj.dt >= unixOffset);
};

export const getWeatherIcon = (id, timeOfDay) => {
  if (id >= 200 && id <= 232) return { weatherIcon: CloudLightning };
  if (id >= 300 && id <= 321) return { weatherIcon: CloudDrizzle };
  if (id >= 500 && id <= 531) return { weatherIcon: CloudRain };
  if (id >= 600 && id <= 622) return { weatherIcon: CloudSnow };
  if (id >= 701 && id <= 781) return { weatherIcon: CloudFog };
  if (id >= 801 && id <= 804) return { weatherIcon: Cloud };
  if (id === 800 && timeOfDay === 'd') return { weatherIcon: Sun };
  if (id === 800 && timeOfDay === 'n') return { weatherIcon: Moon };
};
