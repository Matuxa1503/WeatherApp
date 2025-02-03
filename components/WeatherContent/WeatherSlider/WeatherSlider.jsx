import WeatherCard from './WeatherCard/WeatherCard';
import s from './WeatherSlider.module.scss';

const WeatherSlider = ({ title, data }) => {
  return (
    <div className={s.wrapper}>
      <p className={s.parag}>{title}</p>
      <div className={s.wrapperContent}>
        <div className={s.content}>
          {data.map((data, i) => (
            <WeatherCard key={i} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSlider;
