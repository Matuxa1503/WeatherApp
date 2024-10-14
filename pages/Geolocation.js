import { useEffect, useState } from 'react';
import { getWeatherData } from './api/api';

const Geolocation = () => {
  const defaultCoords = { latitude: 53.55, longitude: 2.4333 };
  const [data, setData] = useState('');
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState({ latitude: defaultCoords.latitude, longitude: defaultCoords.longitude });
  const [error, setErrorLocation] = useState('');
  const [reqError, setReqError] = useState('');
  const [isGpsOn, setGps] = useState(false);

  const getData = async () => {
    const { data: weatherData, err } = await getWeatherData(city, coords.latitude, coords.longitude);
    if (err) {
      setReqError(err);
    } else {
      setReqError('');
      console.log(weatherData);
      setData(weatherData);
    }
  };

  const getLocation = () => {
    if (navigator !== undefined && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
          setReqError('');
          setGps(true);
          // вызываем useEffect с getData() когда поменялись координаты и геолокация включена
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setGps(false);
            setCoords({ latitude: defaultCoords.latitude, longitude: defaultCoords.longitude });
            setReqError('');
            getData();
          } else {
            setErrorLocation(err.message);
          }
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  const getWeatherCity = () => {
    getData();
    setCity('');
  };

  useEffect(() => {
    getLocation();

    return () => {
      setData('');
      setErrorLocation('');
      setGps(false);
      setReqError('');
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
          <p>Тип погоды: {data.weather[0].description}</p>
          <p>Температура: {data.main.temp}</p>
          <p>Ощущаемая температура: {data.main.feels_like}</p>
          <p>Влажность: {data.main.humidity}</p>
          <p>Видимость: {data.visibility}</p>
          <p>Скорость ветра: {data.wind.speed}</p>
          <div>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <button onClick={getWeatherCity}>Поиск погоды по введенному городу</button>
            {reqError && <p>Неккоректный запрос города</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Geolocation;
