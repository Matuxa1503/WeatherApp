const ShowWeatherData = ({ data, pageName }) => {
  const convert = (item) => {
    return Math.round(item);
  };

  return (
    <div>
      <h1>{pageName === 'rootPage' ? data.name : data.dt_txt}</h1>
      <p>Тип погоды: {data.weather[0].description}</p>
      <p>Температура: {convert(data.main.temp)}°C</p>
      <p>Ощущаемая температура: {convert(data.main.feels_like)}°C</p>
      <p>Скорость ветра: {convert(data.wind.speed)} м/с</p>
      <p>Влажность: {data.main.humidity}%</p>
      <p>Атмосферное давление: {convert(data.main.pressure * 0.750061683)} мм рт.ст</p>
      {pageName === 'moreInfoPage' && (
        <>
          <p>Видимость: {convert(data.visibility)} м</p>
          <p>Вероятность осадков: {data.pop * 100} %</p>
          <p>Процент облачности: {convert(data.clouds.all)} %</p>
        </>
      )}
    </div>
  );
};

export default ShowWeatherData;
