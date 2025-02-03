const getLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          isGps: true,
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          resolve({
            isGps: false,
            coords: null,
          });
        } else {
          reject(new Error('Ошибка в getLocation'));
        }
      }
    );
  });
};

export default getLocation;
