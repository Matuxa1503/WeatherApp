import { useEffect, useState } from 'react';
import { getWeatherData } from './api/api';
import Link from 'next/link';
import s from '../styles/RootPage.module.scss';
import { getCurrentPageName } from '../utils/getCurrentPageName';
import ShowWeatherDataRoot from '../components/ShowWeatherData/ShowWeatherDataRoot';
import { getLocation } from '../utils/getLocation';

const RootPage = () => {
  const defaultCoords = { latitude: 53.55, longitude: 2.4333 };
  const [dataWeather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState({ latitude: defaultCoords.latitude, longitude: defaultCoords.longitude });
  const [hasError, setHasError] = useState('');
  const [reqError, setReqError] = useState('');
  const [isGpsOn, setGps] = useState(false);
  const page = getCurrentPageName();

  const getData = async () => {
    const { data, err } = await getWeatherData(city, coords.latitude, coords.longitude, page);
    if (err) {
      setReqError(err);
    } else {
      setReqError('');
      setWeather(data);
    }
  };

  const getWeatherCity = () => {
    getData();
    setCity('');
  };

  useEffect(() => {
    setReqError('');
  }, [city]);

  useEffect(() => {
    getLocation(defaultCoords, setCoords, setReqError, setGps, setHasError, getData);

    return () => {
      setWeather('');
      setHasError('');
      setGps(false);
      setReqError('');
    };
  }, []);

  useEffect(() => {
    if (isGpsOn) {
      getData();
    }
  }, [isGpsOn]);

  return (
    <>
      {hasError && <p>Ошибка загрузки</p>}
      {!hasError && dataWeather === null && <p>Загрузка данных...</p>}
      {!hasError && dataWeather && (
        <div className={s.wrapper}>
          <div className={s.geolocationBlock}>
            <p className={s.geolocationText}>Геолокация {isGpsOn ? 'включена' : 'отключена'}</p>
            <svg className={s.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                fill="currentColor"
                d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8l176 0 0 176c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
              />
            </svg>
          </div>
          <div className={s.weatherInfo}>
            <ShowWeatherDataRoot data={dataWeather} />
            <Link href={`/weather/${dataWeather.name}?latitude=${coords.latitude}&longitude=${coords.longitude}`}>
              <button className={`${s.btn} m-5 bg-b`}>Подробнее о погоде по часам</button>
            </Link>
            <div className={s.searchBlock}>
              <input
                className={`${s.input} ${reqError && 'border-solid'}`}
                placeholder="Название города"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {reqError && <p className={s.error}>Неккоректный запрос ввода</p>}
              <button className={`${s.btn} block mt-5 bg-a ${!city.trim() ? 'opacity-10' : ''}`} disabled={!city.trim()} onClick={getWeatherCity}>
                Поиск погоды по введенному городу
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RootPage;
