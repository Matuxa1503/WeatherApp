import { useEffect, useState } from 'react';
import s from './CitySearch.module.scss';
import { Button } from '../Button/Button';
import { Search } from 'lucide-react';

const CitySearch = ({ onFetchErr }) => {
  const [city, setCity] = useState('');
  const [reqError, setReqError] = useState(null);

  const getWeatherCity = async () => {
    try {
      const err = await onFetchErr(city);
      if (err) {
        setReqError(err);
      } else {
        setCity('');
        setReqError(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setReqError(null);
  }, [city]);

  return (
    <div className={s.searchBlock}>
      <div className={'relative'}>
        <input
          className={`${s.input} ${reqError ? 'border-red-500' : 'border-transparent'}`}
          placeholder="Поиск"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {reqError && <p className={s.error}>Неккоректный запрос</p>}
      </div>
      <Button
        classBtn={`${s.btn} ${!city.trim() ? 'opacity-10 pointer-events-none' : ''}`}
        handleDisabled={!city.trim()}
        handleClick={getWeatherCity}
      >
        <Search className={s.searchIcon} />
      </Button>
    </div>
  );
};

export default CitySearch;
