import Swiper from './swiper-bundle.min';

export default () => {
  // const DEVICE_WIDTH = window.innerWidth && document.documentElement.clientWidth
  //   ? Math.min(window.innerWidth, document.documentElement.clientWidth)
  //   : window.innerWidth
  //   || document.documentElement.clientWidth
  //   || document.getElementsByTagName('body')[0].clientWidth;

  const swipers = document.querySelectorAll('.swiper');

  swipers.forEach((swiperItem) => {
    let prevButton = null;
    let nextButton = null;
    let pagination = null;

    const swiperArgs = {
      slidesPerView: 1,
      spaceBetween: 0,
      // autoHeight: true,
      resizeObserver: true,
    };

    // Smart sliders
    if (swiperItem.classList.contains('cards__slider')) {
      // swiperArgs.spaceBetween = parseInt(((DEVICE_WIDTH - swiperItem.offsetWidth) / 2), 10);

      pagination = swiperItem.querySelector('.swiper-pagination');
    }

    // Home sliders
    if (swiperItem.classList.contains('home__slider')) {
      prevButton = swiperItem.closest('section').querySelector('.swiper-button-prev');
      nextButton = swiperItem.closest('section').querySelector('.swiper-button-next');
      pagination = swiperItem.closest('section').querySelector('.swiper-pagination');
    }

    if (pagination) {
      swiperArgs.pagination = {
        el: pagination,
        clickable: true,
      };
    }

    if (prevButton && nextButton) {
      swiperArgs.breakpoints = {
        // when window width is >= 1440px
        1440: {
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
          },
        },
      };
    }

    const swiperSlider = new Swiper(swiperItem, swiperArgs);

    // console.log(swiperSlider);
  });
};
