import { useEffect, useState } from 'react';

const useLocation = (setCoords, setHasError) => {
  const [isGpsOn, setGps] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
          setGps(true);
          setHasError(null);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setGps(false);
            setHasError(null);
          } else {
            setHasError(err.message);
          }
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { isGpsOn };
};

export default useLocation;
