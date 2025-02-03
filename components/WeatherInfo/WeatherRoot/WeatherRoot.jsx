import React, { useEffect, useState } from 'react';
import { Droplet, Gauge, Wind } from 'lucide-react';
import IconTextWrapper from '../../IconTextWrapper';
import { getWeatherIcon } from '../../../utils/weather';
import s from './WeatherRoot.module.scss';

const WeatherRoot = ({ data }) => {
  const convert = (item) => {
    return Math.round(item);
  };
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    setIcon(getWeatherIcon(data.weather[0].id, data.weather[0].icon.slice(-1)));
  }, [data]);

  return (
    <div className={s.container}>
      <div className={s.temp}>
        {icon && <icon.weatherIcon className={s.icon} />}
        <p className={s.tempCurrent}>{convert(data.main.temp)}°c</p>
        <p className={s.weatherType}>{data.weather[0].description}</p>
        <p className={s.tempFeelsLike}>Ощущается как: {convert(data.main.feels_like)}°c</p>
      </div>
      <div className={s.infoWeather}>
        <IconTextWrapper Icon={Wind} text={`${convert(data.wind.speed)} м/с`} />
        <IconTextWrapper Icon={Droplet} text={`${data.main.humidity} %`} />
        <IconTextWrapper Icon={Gauge} text={`${convert(data.main.pressure * 0.750061683)} мм рт.ст`} />
      </div>
      <h1 className={s.title}>{data.name}</h1>
    </div>
  );
};

export default WeatherRoot;
