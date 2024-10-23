import s from '../../styles/ShowWeatherData.module.scss';
import WeatherInfo from './WeatherInfo';

const ShowWeatherDataInfo = ({ data }) => {
  const convert = (item) => {
    return Math.round(item);
  };

  return (
    <div>
      <h1 className={s.title}>{data.dt_txt}</h1>
      <h2 className={s.subtitle}>{data.weather[0].description}</h2>
      <div className={s.temp}>
        <WeatherInfo
          svg={
            <svg className="h-9 w-9 text-d translate-y-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 164.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5L96 112zM144 0C82.1 0 32 50.2 32 112l0 164.4c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6L256 112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3L160 112c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 210.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"
              />
            </svg>
          }
          paragText={<p className={s.tempCurrent}>Температура: {convert(data.main.temp)}°C</p>}
        />
        <p className={s.tempFeelsLike}>Ощущается как: {convert(data.main.feels_like)}°C</p>
      </div>
      <div className={s.infoWeather}>
        <WeatherInfo
          svg={
            <svg className={s.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M288 32c0 17.7 14.3 32 32 32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l320 0c53 0 96-43 96-96s-43-96-96-96L320 0c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32l32 0c53 0 96-43 96-96s-43-96-96-96L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32zM128 512l32 0c53 0 96-43 96-96s-43-96-96-96L32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
              />
            </svg>
          }
          paragText={<p>Скорость ветра: {convert(data.wind.speed)} м/с</p>}
        />
        <WeatherInfo
          svg={
            <svg className={s.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                fill="currentColor"
                d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"
              />
            </svg>
          }
          paragText={<p>Влажность: {data.main.humidity} %</p>}
        />
        <WeatherInfo
          svg={
            <svg className={s.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-15.9-5.8-30.4-15.3-41.6l76.6-147.4c6.1-11.8 1.5-26.3-10.2-32.4s-26.2-1.5-32.4 10.2L262.1 288.3c-2-.2-4-.3-6.1-.3c-35.3 0-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64z"
              />
            </svg>
          }
          paragText={<p>Атмосферное давление: {convert(data.main.pressure * 0.750061683)} мм рт.ст</p>}
        />
        <p>Видимость: {convert(data.visibility)} м</p>
        <p>Вероятность осадков: {data.pop * 100} %</p>
        <p>Процент облачности: {convert(data.clouds.all)} %</p>
      </div>
    </div>
  );
};

export default ShowWeatherDataInfo;
