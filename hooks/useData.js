import { useState } from 'react';
import { getDetailsForecast, getForecast } from '../pages/api/api';

const useData = (setCoords, setHasError) => {
  const [data, setData] = useState(null);

  const fetchData = async (page, params) => {
    let response;
    try {
      if (page === 'rootPage') {
        response = await getForecast(params);
      }

      if (page === 'moreInfoPage') {
        response = await getDetailsForecast(params);
      }

      // return в if условии нужен для работы CitySearch.jsx
      if (response?.err) {
        return response.err;
      }

      setData(response?.data);
      setCoords ? setCoords(response?.data.coord) : '';
      setHasError(null);
      return null;
    } catch (err) {
      console.error('useData:', err.message);
      setHasError(err);
    }
  };

  return { data, fetchData };
};

export default useData;
