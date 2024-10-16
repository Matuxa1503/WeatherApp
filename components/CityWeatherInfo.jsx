const CityWeatherInfo = ({ cityInfo }) => {
  const convertUnix = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      <h1>
        {cityInfo.name} {cityInfo.country}
      </h1>
      <p>Время восхода Солнца: {convertUnix(cityInfo.sunrise)}</p>
      <p>Время захода Солнца: {convertUnix(cityInfo.sunset)}</p>
    </div>
  );
};

export default CityWeatherInfo;
