import tz_lookup from 'tz-lookup';
import s from './SunInfo.module.scss';

const SunInfo = ({ Icon, title, coords, sunType }) => {
  const timeZone = tz_lookup(coords.lat, coords.lon);

  const convertToLocalTime = (unixTime, timeZone) => {
    const date = new Date(unixTime * 1000).toLocaleString('ru-RU', { timeZone });

    const time = date.split(', ')[1];
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  return (
    <div className={s.sunInfo}>
      <Icon className={`${s.icon} ${title === 'Восход' ? s.sunrise : s.sunset}`} />
      <h3 className={s.title}>{title}</h3>
      <p className={s.subtitle}>{convertToLocalTime(sunType, timeZone)}</p>
    </div>
  );
};

export default SunInfo;
