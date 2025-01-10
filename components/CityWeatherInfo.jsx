import s from '../styles/CityWeatherInfo.module.scss';
import { convertToLocalTime } from '../utils/getStringTimeFromUnix';

const CityWeatherInfo = ({ cityInfo }) => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>
        {cityInfo.name} ({cityInfo.country})
      </h1>
      <div className={s.wrapperSubtitle}>
        {/* Время указано не местное! Указано по поясу Минска*/}
        <h2 className={s.subtitle}>Время восхода Солнца: {convertToLocalTime(cityInfo.sunrise)}</h2>
        <h2 className={s.subtitle}>Время захода Солнца: {convertToLocalTime(cityInfo.sunset)}</h2>
      </div>
    </div>
  );
};

export default CityWeatherInfo;
