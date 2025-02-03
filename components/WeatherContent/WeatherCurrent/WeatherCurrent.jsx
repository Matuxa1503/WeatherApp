import { Binoculars, CircleGauge, Cloud, Droplet, Sun, Umbrella, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';
import IconTextWrapper from '../../IconTextWrapper';
import { getWeatherIcon, getWindDirection } from '../../../utils/weather';
import { getHourAndMinute, getTimeOfDay } from '../../../utils/dates';
import s from './WeatherCurrent.module.scss';

const WeatherCurrent = ({ data }) => {
  const convert = (item) => {
    return Math.round(item);
  };

  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    setWind(getWindDirection(data.wind.deg));
    const timeOfDay = getTimeOfDay(data.dt_txt);
    setIcon(getWeatherIcon(data.weather[0].id, timeOfDay));
  }, [data]);

  return (
    <>
      {wind && icon && (
        <div className={s.container}>
          <p className={s.subtitle}>{`Погода на ${getHourAndMinute(data.dt_txt)}`}</p>
          <div className={s.infoWeather}>
            <h1 className={s.title}>{convert(data.main.temp)}°</h1>
            <div className={s.moreInfo}>
              <IconTextWrapper Icon={icon.weatherIcon} text={`${data.weather[0].description}`} />
              <IconTextWrapper Icon={Wind} text={`${convert(data.wind.speed)} м/с, ${wind.name}`} WindIcon={wind.icon} />
              <IconTextWrapper Icon={Droplet} text={`${convert(data.main.humidity)} %`} />
              <IconTextWrapper Icon={CircleGauge} text={`${convert(data.main.pressure * 0.750061683)} мм рт.ст`} />
            </div>
          </div>
          <div className={s.additionalInfo}>
            <p className={s.tempFeelsLike}>Ощущается как: {convert(data.main.feels_like)}°C</p>
            <IconTextWrapper Icon={Binoculars} text={`Видимость: ${convert(data.visibility)} м`} />
            <IconTextWrapper Icon={Umbrella} text={`Вероятность осадков: ${convert(data.pop * 100)} %`} />
            <IconTextWrapper Icon={Cloud} text={`Процент облачности: ${convert(data.clouds.all)} %`} />
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherCurrent;
