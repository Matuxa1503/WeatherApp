import axios from 'axios';

export const getWeatherData = async (city, lat, lon) => {
  try {
    let response;
    if (city) {
      response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b9ed585c43dbd690489f02503451b75&units=metric&lang=ru`
      );
    } else if (lat && lon) {
      response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7b9ed585c43dbd690489f02503451b75&units=metric&lang=ru`
      );
    }
    return { data: response.data, err: null };
  } catch (err) {
    return { data: null, err: err.message };
  }
};
