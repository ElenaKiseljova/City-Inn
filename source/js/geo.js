export default () => {
  const showPositionSuccess = (position) => {
    console.log(`Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`);
  };

  const showPositionError = (position) => {
    console.log('Error: ', position.message);
  };

  const getLocation = () => {
    if (window.navigator.geolocation) {
      return window.navigator.geolocation.getCurrentPosition(showPositionSuccess, showPositionError);
    }

    return 'Geolocation is not supported by this browser.';
  };

  getLocation();

  console.log('Cur lang: ', window.navigator.language);
};
