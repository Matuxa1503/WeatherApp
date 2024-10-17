export const getLocation = (defaultCoords, setCoords, setReqError, setGps, setHasError, getData) => {
  if (navigator !== undefined && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        setReqError('');
        setGps(true);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setCoords({ latitude: defaultCoords.latitude, longitude: defaultCoords.longitude });
          setReqError('');
          setGps(false);
          getData();
        } else {
          setHasError(err.message);
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
    );
  }
};
