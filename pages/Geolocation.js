import { useEffect, useState } from 'react';
import { getWeatherData } from './api/api';

const Geolocation = (weatherData) => {
  const [data, setData] = useState('');
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState('');

  const getData = async () => {
    const defaultCoords = {
      latitude: 53.8902528,
      longitude: 27.5677184,
    };

    const weatherData = await getWeatherData(defaultCoords.latitude, defaultCoords.longitude);
    setData(weatherData);
  };

  useEffect(() => {
    if (navigator !== undefined && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (err) => {
          setError(err.message);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
      );
    }
  }, []);

  return (
    <>
      <button onClick={getData}>get data</button>
      {error ? (
        <p>Ошибка: {error}</p>
      ) : data === '' ? (
        <p>Загрузка данных...</p>
      ) : (
        <div>
          <h1>{data.name}</h1>
          <p>Тип погоды: {data.weather[0].main}</p>
          <p>Температура: {data.main.temp}</p>
          <p>Ощущаемая температура: {data.main.feels_like}</p>
          <p>Влажность: {data.main.humidity}</p>
          <p>Видимость: {data.visibility}</p>
          <p>Скорость ветра: {data.wind.speed}</p>
        </div>
      )}
    </>
  );
};

export default Geolocation;
