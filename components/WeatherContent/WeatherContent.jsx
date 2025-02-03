import { useEffect, useState } from 'react';
import { getDates, getWeatherByDate } from '../../utils/dates';
import { getCurrentWeather } from '../../utils/weather';
import WeatherCurrent from './WeatherCurrent/WeatherCurrent';
import WeatherSlider from './WeatherSlider/WeatherSlider';

const WeatherContent = ({ data }) => {
  const [weatherData, setWeatherData] = useState({
    current: null,
    today: [],
    tomorrow: [],
  });

  useEffect(() => {
    if (!data.list?.length) return;

    const times = getDates();
    const currentWeather = getCurrentWeather(data.list, times.unixWithOffset);
    const arrTodayWeather = getWeatherByDate(data.list, times.unixWithOffset, times.currentDate);
    const arrTomorrowWeather = getWeatherByDate(data.list, times.unixWithOffset, times.tomorrowDate);
    setWeatherData({ current: currentWeather, today: arrTodayWeather, tomorrow: arrTomorrowWeather });
  }, [data]);

  return (
    <>
      {weatherData.current && <WeatherCurrent data={weatherData.current} />}
      {weatherData.today.length > 0 && <WeatherSlider title="Прогноз на сегодня" data={weatherData.today} />}
      {weatherData.tomorrow.length > 0 && <WeatherSlider title="Прогноз на завтра" data={weatherData.tomorrow} />}
    </>
  );
};

export default WeatherContent;
