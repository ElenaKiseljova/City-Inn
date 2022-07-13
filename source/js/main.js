import swipers from './swipers';
import map from './map';

document.addEventListener('DOMContentLoaded', () => {
  swipers();

  try {
    map();
  } catch (error) {
    console.log(error.message);
  }
});
