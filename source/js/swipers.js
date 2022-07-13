import Swiper from './swiper-bundle.min';

export default () => {
  const swipers = document.querySelectorAll('.swiper');

  swipers.forEach((swiperItem) => {
    const prevButton = swiperItem.querySelector('.home__prev');
    const nextButton = swiperItem.querySelector('.home__next');

    const swiperArgs = {
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      resizeObserver: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    };

    if (prevButton && nextButton) {
      swiperArgs.breakpoints = {
        // when window width is >= 1440px
        1440: {
          navigation: {
            nextEl: '.home__next',
            prevEl: '.home__prev',
          },
        },
      };
    }

    const swiperSlider = new Swiper(swiperItem, swiperArgs);

    // console.log(swiperSlider);
  });
};
