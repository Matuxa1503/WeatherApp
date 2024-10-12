import { useEffect, useState } from 'react';

const Geolocation = () => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator !== undefined && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (err) => {
          setError(err.message);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
      );
    }
  }, []);

  return (
    <>
      {error ? (
        <p>Ошибка: {error}</p>
      ) : (
        <div>
          <h1>Main page</h1>
          <p>
            Your coords: {coords.latitude} and {coords.longitude}
          </p>
        </div>
      )}
    </>
  );
};

export default Geolocation;
