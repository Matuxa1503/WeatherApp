import Link from 'next/link';
import s from './WeatherInfo.module.scss';
import WeatherRoot from './WeatherRoot/WeatherRoot';
import { Button } from '../Button/Button';

const WeatherInfo = ({ coords, data }) => {
  return (
    <div className={s.weatherInfo}>
      <WeatherRoot data={data} />
      <Link href={`/weather/${data.name}?lat=${coords.lat}&lon=${coords.lon}`}>
        <Button classBtn={`${s.btn}`}>Подробнее о погоде по часам</Button>
      </Link>
    </div>
  );
};

export default WeatherInfo;
