import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getWeatherData } from '../api/api';
import CityWeatherInfo from '../../components/CityWeatherInfo';
import Link from 'next/link';
import s from '../../styles/SlugCity.module.scss';
import { getCurrentPageName } from '../../utils/getCurrentPageName';
import { formatWeatherDates } from '../../utils/formatWeatherDates';
import ShowWeatherDataInfo from '../../components/ShowWeatherData/ShowWeatherDataInfo';

const WeatherDetails = () => {
  const [dataWeather, setWeather] = useState('');
  const [hasError, setHasError] = useState('');
  const router = useRouter();
  const page = getCurrentPageName();

  const { city, latitude, longitude } = router.query;

  const getData = async () => {
    const { data, infoCity, err } = await getWeatherData(city, latitude, longitude, page);
    if (err) {
      setHasError(err);
    } else {
      setHasError('');

      const times = formatWeatherDates();
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
          <Link className="flex justify-center" href={'/'}>
            <button className={`${s.btn} bg-a`}>Вернуться на Главную</button>
          </Link>
          {Boolean(dataWeather.today.length) ? (
            <p className={s.paragData}>Данные на сегодня:</p>
          ) : (
            <p className={s.paragData}>Новые данные о погоде появятся в 0:00</p>
          )}
          <div className={s.content}>
            {Boolean(dataWeather.today.length) && (
              <>
                {dataWeather.today.map((item, index) => (
                  <div className={s.item} key={index}>
                    <ShowWeatherDataInfo data={item} />
                  </div>
                ))}
              </>
            )}
          </div>
          <div>
            <p className={s.paragData}>Данные на завтрашний день:</p>
            <div className={s.content}>
              <div className={s.item}>
                <ShowWeatherDataInfo data={dataWeather.tomorrow} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherDetails;
