import menu from './menu';
import callUs from './call-us';
import swipers from './swipers';
import map from './map';

document.addEventListener('DOMContentLoaded', () => {
  try {
    menu();
  } catch (error) {
    console.log(error.message);
  }

  try {
    callUs();
  } catch (error) {
    console.log(error.message);
  }

  try {
    swipers();
  } catch (error) {
    console.log(error.message);
  }

  try {
    map();
  } catch (error) {
    console.log(error.message);
  }
});
