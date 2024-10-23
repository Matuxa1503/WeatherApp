import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getWeatherData } from '../api/api';
import ShowWeatherData from '../../components/ShowWeatherData/ShowWeatherData';
import CityWeatherInfo from '../../components/CityWeatherInfo';
import Link from 'next/link';
import s from '../../styles/SlugCity.module.scss';
import { getCurrentPageName } from '../../utils/getCurrentPageName';

const WeatherDetails = () => {
  const [dataWeather, setWeather] = useState('');
  const [hasError, setHasError] = useState('');
  const router = useRouter();
  const page = getCurrentPageName();

  const { city, latitude, longitude } = router.query;

  const formattedTimes = () => {
    const today = new Date();

    // Достаем дату формата 'YYYY-MM-DD' из строки
    const getDate = (date) => date.toISOString().split('T')[0];

    // Увеличиваем дату на один день и забираем погоду в 12 часов дня
    const getTomorrowDate = () => {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return getDate(tomorrow) + ' 12:00:00';
    };
    // Текущее время в формате Unix +3 часа
    const currentUnixTime = Math.floor(Date.now() / 1000) + 10800;

    return { currentUnixTime, formattedDate: getDate(today), tomorrowDate: getTomorrowDate() };
  };

  const getData = async () => {
    const { data, infoCity, err } = await getWeatherData(city, latitude, longitude, page);
    if (err) {
      setHasError(err);
    } else {
      setHasError('');

      const times = formattedTimes();
      const tomorrowWeather = data.find((obj) => obj.dt_txt.includes(times.tomorrowDate));
      const arrTodayWeather = data.filter((obj) => {
        if (obj.dt >= times.currentUnixTime && obj.dt_txt.includes(times.formattedDate)) {
          return true;
        }
        return false;
      });
      setWeather({ infoCity, today: arrTodayWeather, tomorrow: tomorrowWeather });
    }
  };

  useEffect(() => {
    if (city && latitude && longitude) getData();

    return () => {
      setWeather('');
      setHasError('');
    };
  }, [city, latitude, longitude]);

  return (
    <>
      {hasError && <p>Ошибка загрузки</p>}
      {!hasError && dataWeather === null && <p>Загрузка данных...</p>}
      {!hasError && dataWeather && (
        <div className={s.wrapper}>
          <CityWeatherInfo cityInfo={dataWeather.infoCity} />
          <div className={s.content}>
            <div>
              {dataWeather.today.length === 0 ? (
                <p className={s.paragData}>Новые данные о погоде появятся завтра в 0:00</p>
              ) : (
                <>
                  <p className={s.paragData}>Данные на сегодня:</p>
                  {dataWeather.today.map((item, index) => (
                    <div key={index}>
                      <ShowWeatherData data={item} />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div>
              <p className={s.paragData}>Данные на завтрашний день:</p>
              <ShowWeatherData data={dataWeather.tomorrow} />
            </div>
          </div>
          <Link href={'/'}>
            <button>Вернуться назад</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default WeatherDetails;
