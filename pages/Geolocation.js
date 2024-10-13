import { useEffect, useState } from 'react';
import { getWeatherData } from './api/api';

const Geolocation = () => {
  const defaultCoords = { latitude: 53.55, longitude: 2.4333 };
  const [data, setData] = useState('');
  const [coords, setCoords] = useState({ latitude: defaultCoords.latitude, longitude: defaultCoords.longitude });
  const [error, setError] = useState('');
  const [isGpsOn, setGps] = useState(false);

  const getData = async () => {
    const weatherData = await getWeatherData(coords.latitude, coords.longitude);
    setData(weatherData);
  };

  const getLocation = () => {
    if (navigator !== undefined && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
          setGps(true);
          console.log('gps on');
          // вызываем useEffect с getData() когда поменялись координаты и геолокация включена
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setGps(false);
            setCoords({ latitude: defaultCoords.latitude, longitude: defaultCoords.longitude });
            console.log('gps off');
            getData();
          } else {
            setError(err.message);
          }
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  useEffect(() => {
    getLocation();

    return () => {
      setData('');
      setError('');
      setGps(false);
    };
  }, []);

  useEffect(() => {
    if (isGpsOn) {
      getData();
    }
  }, [coords, isGpsOn]);

  return (
    <>
      {error ? (
        <p>Ошибка: err.message</p>
      ) : data === '' ? (
        <p>Загрузка данных...</p>
      ) : (
        <div>
          <h1>{data.name}</h1>
          <p>Геолокация {isGpsOn ? 'включена' : 'отключена'}</p>
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
