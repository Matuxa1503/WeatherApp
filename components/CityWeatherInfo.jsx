import s from '../styles/CityWeatherInfo.module.scss';
import { convertUnix } from '../utils/getStringTimeFromUnix';

const CityWeatherInfo = ({ cityInfo }) => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>
        {cityInfo.name} ({cityInfo.country})
      </h1>
      <div className={s.wrapperSubtitle}>
        <h2 className={s.subtitle}>Время восхода Солнца: {convertUnix(cityInfo.sunrise)}</h2>
        <h2 className={s.subtitle}>Время захода Солнца: {convertUnix(cityInfo.sunset)}</h2>
      </div>
    </div>
  );
};

export default CityWeatherInfo;
