import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const APIKey = '7b9ed585c43dbd690489f02503451b75';
const otherParam = 'units=metric&lang=ru';

export const getWeatherData = async (city, lat, lon, namePage) => {
  let response;

  if (namePage === 'rootPage') {
    try {
      if (city) {
        response = await axios.get(`${baseUrl}weather?q=${city}&appid=${APIKey}&${otherParam}`);
      } else if (lat && lon) {
        response = await axios.get(`${baseUrl}weather?lat=${lat}&lon=${lon}&appid=${APIKey}&${otherParam}`);
      }
      return { data: response.data, err: null };
    } catch (err) {
      return { data: null, err: err.message };
    }
  }

  if (namePage === 'moreInfoPage') {
    try {
      if (city) {
        response = await axios.get(`${baseUrl}forecast?q=${city}&appid=${APIKey}&${otherParam}`);
      } else if (lat && lon) {
        response = await axios.get(`${baseUrl}forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&${otherParam}`);
      }
      return { data: response.data.list, infoCity: response.data.city, err: null };
    } catch (err) {
      return { data: null, infoCity: null, err: err.message };
    }
  }
};
