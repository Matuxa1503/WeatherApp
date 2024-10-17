export const getLocation = (defaultCoords, setCoords, setReqError, setGps, setHasError, getData) => {
  if (navigator !== undefined && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        setReqError('');
        setGps(true);
        // вызываем useEffect с getData() когда поменялись координаты и геолокация включена
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGps(false);
          setCoords({ latitude: defaultCoords.latitude, longitude: defaultCoords.longitude });
          setReqError('');
          // getData();
        } else {
          setHasError(err.message);
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
    );
  }
};
