import { useEffect, useState } from 'react';
import { getHourAndMinute, getTimeOfDay } from '../../../../utils/dates';
import { getWeatherIcon } from '../../../../utils/weather';
import s from './WeatherCard.module.scss';

const WeatherCard = ({ data }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (data) {
      const timeOfDay = getTimeOfDay(data.dt_txt);
      setIcon(getWeatherIcon(data.weather[0].id, timeOfDay));
    }
  }, [data]);

  return (
    <div className={s.container}>
      <p className={s.title}>{getHourAndMinute(data.dt_txt)}</p>
      {icon && <icon.weatherIcon className={s.icon} />}
      <p className={s.title}>{Math.round(data.main.temp)}°</p>
    </div>
  );
};

export default WeatherCard;
