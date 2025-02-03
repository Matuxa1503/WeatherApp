import { Sunrise, Sunset } from 'lucide-react';
import SunInfo from './SunInfo/SunInfo';
import s from './CitySunInfo.module.scss';

const CitySunInfo = ({ city }) => {
  const coords = {
    lat: city.coord.lat,
    lon: city.coord.lon,
  };

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>
        {city.name} ({city.country})
      </h1>
      <div className={s.wrapperSunTimes}>
        <SunInfo Icon={Sunrise} title={'Восход'} coords={coords} sunType={city.sunrise} />
        <SunInfo Icon={Sunset} title={'Закат'} coords={coords} sunType={city.sunset} />
      </div>
    </div>
  );
};

export default CitySunInfo;
