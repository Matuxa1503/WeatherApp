import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const APIKey = '7b9ed585c43dbd690489f02503451b75';

const settingsParams = { units: 'metric', lang: 'ru' };
const defaultParams = {
  appid: APIKey,
  ...settingsParams,
};
let response;

const fetchData = async (endpoint, params) => {
  try {
    response = await axios.get(`${baseUrl}${endpoint}`, { params });
    return { data: response.data, err: null };
  } catch (err) {
    return { data: null, err: err.message };
  }
};

export const getForecast = async (params) => {
  const weather = 'weather';
  const { lat, lon, city } = params;

  if (city) {
    return await fetchData(weather, { q: city, ...defaultParams });
  }
  if (lat && lon) {
    return await fetchData(weather, { lat, lon, ...defaultParams });
  }
};

export const getDetailsForecast = async (params) => {
  const forecast = 'forecast';
  const { lat, lon, city } = params;

  if (city) {
    return await fetchData(forecast, { q: city, ...defaultParams });
  }
  if (lat && lon) {
    return await fetchData(forecast, { lat, lon, ...defaultParams });
  }
};
