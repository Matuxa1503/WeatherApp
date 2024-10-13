import axios from 'axios';

export const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7b9ed585c43dbd690489f02503451b75&units=metric`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
