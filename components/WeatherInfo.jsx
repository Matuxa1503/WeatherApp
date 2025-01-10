const WeatherInfo = ({ svg, paragText }) => {
  return (
    <div className="flex justify-center gap-2 items-center">
      {svg}
      {paragText}
    </div>
  );
};

export default WeatherInfo;
