import s from '../styles/CityWeatherInfo.module.scss';

const CityWeatherInfo = ({ cityInfo }) => {
  const convertUnix = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

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
