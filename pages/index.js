import { useEffect, useRef, useState } from 'react';
import CitySearch from '../components/CitySearch/CitySeacrh';
import GeolocationStatus from '../components/geolocationStatus/GeolocationStatus';
import WeatherInfo from '../components/WeatherInfo/WeatherInfo';
import useData from '../hooks/useData';
import getLocation from '../utils/location';
import { getCurrentPageName } from '../utils/getCurrentPageName';
import Loader from '../components/Loader/Loader';
import s from '../styles/rootStyle.module.scss';
import PageAnimation from '../components/PageAnimation';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const App = () => {
  const prevCoordsRef = useRef({ coords: { lat: null, lon: null } });
  const [hasError, setHasError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [isGpsOn, setGps] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const page = getCurrentPageName();
  // custom hook
  const { data, fetchData } = useData(setCoords, setHasError);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const { isGps, coords } = await getLocation();
        if (isGps) {
          setCoords(coords);
          setGps(isGps);
        } else {
          const storageCoords = JSON.parse(sessionStorage.getItem('weatherCoords'));
          storageCoords ? setCoords(storageCoords) : setCoords({ lon: 27.5667, lat: 53.9 });
        }
        setIsLoading(false);
      } catch (err) {
        setHasError(err.message);
      }
    };

    getUserLocation();
  }, [isGpsOn]);

  useEffect(() => {
    if (!isLoading && coords && (coords.lat !== prevCoordsRef.current.coords.lat || coords.lon !== prevCoordsRef.current.coords.lon)) {
      fetchData(page, coords);
      sessionStorage.setItem('weatherCoords', JSON.stringify(coords));
      prevCoordsRef.current.coords = coords;
    }
  }, [coords, isLoading]);

  return (
    <>
      {isLoading && <Loader />}
      {hasError && <p>Ошибка загрузки</p>}
      {data && (
        <PageAnimation className={s.wrapper}>
          <GeolocationStatus isGpsOn={isGpsOn} />
          <CitySearch onFetchErr={async (city) => await fetchData(page, { city })} />
          <WeatherInfo coords={coords} data={data} />
        </PageAnimation>
      )}
    </>
  );
};

export default App;
