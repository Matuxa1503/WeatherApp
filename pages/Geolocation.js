import { useEffect, useState } from 'react';
import { getWeatherData } from './api/api';
import Link from 'next/link';
import ShowWeatherData from '../components/ShowWeatherData';

const Geolocation = () => {
  const defaultCoords = { latitude: 53.55, longitude: 2.4333 };
  const [data, setData] = useState({
    coord: {
      lon: 2.4333,
      lat: 53.55,
    },
    weather: [
      {
        id: 801,
        main: 'Clouds',
        description: 'небольшая облачность',
        icon: '02d',
      },
    ],
    base: 'stations',
    main: {
      temp: 13,
      feels_like: 12.13,
      temp_min: 13,
      temp_max: 13,
      pressure: 1018,
      humidity: 68,
      sea_level: 1018,
      grnd_level: 1018,
    },
    visibility: 10000,
    wind: {
      speed: 5.78,
      deg: 87,
      gust: 5.71,
    },
    clouds: {
      all: 24,
    },
    dt: 1728918334,
    sys: {
      type: 1,
      id: 1537,
      country: 'GB',
      sunrise: 1728886551,
      sunset: 1728924972,
    },
    timezone: 0,
    id: 2640766,
    name: 'Overstrand',
    cod: 200,
  });
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState({ latitude: defaultCoords.latitude, longitude: defaultCoords.longitude });
  const [error, setErrorLocation] = useState('');
  const [reqError, setReqError] = useState('');
  const [isGpsOn, setGps] = useState(false);

  const pageName = 'rootPage';

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
            // getData();
          } else {
            setErrorLocation(err.message);
          }
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  const getWeatherCity = () => {
    // getData();
    setCity('');
  };

  useEffect(() => {
    // getLocation();

    return () => {
      // setData('');
      setErrorLocation('');
      setGps(false);
      setReqError('');
    };
  }, []);

  useEffect(() => {
    if (isGpsOn) {
      // getData();
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
          <p>Геолокация {isGpsOn ? 'включена' : 'отключена'}</p>
          <ShowWeatherData data={data} namePage={pageName} />
          <div>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <button onClick={getWeatherCity}>Поиск погоды по введенному городу</button>
            {reqError && <p>Неккоректный запрос города</p>}
          </div>
          <div>
            <Link href={`/weather/${data.name}?latitude=${coords.latitude}&longitude=${coords.longitude}`}>
              <button>Подробнее о погоде по часам</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Geolocation;
