import Swiper from './swiper-bundle.min';

export default () => {
  const DEVICE_WIDTH = window.innerWidth && document.documentElement.clientWidth
    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
    : window.innerWidth
    || document.documentElement.clientWidth
    || document.getElementsByTagName('body')[0].clientWidth;

  const swiperInit = (swiperItem, attr = {}) => {
    let prevButton = null;
    let nextButton = null;
    let pagination = null;

    const swiperArgs = {
      slidesPerView: 1,
      spaceBetween: 0,
      // autoHeight: true,
      resizeObserver: true,
    };

    prevButton = swiperItem.closest('section').querySelector('.swiper-button-prev');
    nextButton = swiperItem.closest('section').querySelector('.swiper-button-next');

    // Smart sliders
    if (swiperItem.classList.contains('cards__slider')) {
      pagination = swiperItem.closest('.cards__item').querySelector('.swiper-pagination');
    }

    // Restaurant sliders
    if (swiperItem.classList.contains('cosy__slider')) {
      if (DEVICE_WIDTH < 768) {
        pagination = swiperItem.closest('.cosy').querySelector('.cosy__pagination--mobile');
      } else {
        pagination = swiperItem.closest('.cosy').querySelector('.cosy__pagination--tablet');
      }
    }

    if (swiperItem.classList.contains('food__slider')) {
      if (DEVICE_WIDTH < 768) {
        pagination = swiperItem.closest('.food').querySelector('.food__pagination--mobile');
      } else {
        pagination = swiperItem.closest('.food').querySelector('.food__pagination--tablet');
      }

      if (DEVICE_WIDTH > 768) {
        swiperArgs.spaceBetween = 75;
      }
    }

    if (swiperItem.classList.contains('banquet__slider')) {
      pagination = swiperItem.closest('.banquet').querySelector('.swiper-pagination');
    }

    // Home sliders
    if (swiperItem.classList.contains('home__slider')) {
      pagination = swiperItem.closest('.home').querySelector('.swiper-pagination');
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
        1366: {
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
          },
        },
      };
    }

    const swiperArgsMerged = {
      ...swiperArgs,
      ...attr,
    };

    const swiperSlider = new Swiper(swiperItem, swiperArgsMerged);

    return swiperSlider;
  };

  // Swipers not Events slider
  const swipers = document.querySelectorAll('.swiper:not(.event__slider)');

  swipers.forEach((swiperItem) => {
    swiperInit(swiperItem);
  });

  // Events slider
  const eventSliderImages = document.querySelector('.event__slider--images');

  if (eventSliderImages) {
    const pagination = eventSliderImages.closest('section').querySelector('.swiper-pagination');

    const attrImages = {
      pagination: {
        el: pagination,
        clickable: true,
      },
    };

    if (DEVICE_WIDTH > 1366) {
      attrImages.spaceBetween = 280;
    }

    const imagesEventSlider = swiperInit(eventSliderImages, attrImages);

    const eventSliderText = document.querySelector('.event__slider--text');

    if (eventSliderText) {
      const attrText = {
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        breakpoints: {
          // when window width is >= 1440px
          1366: {
          },
        },
      };

      const textEventSlider = swiperInit(eventSliderText, attrText);

      textEventSlider.on('slideChange', () => {
        imagesEventSlider.slideTo(textEventSlider.activeIndex);
      });

      imagesEventSlider.on('slideChange', () => {
        textEventSlider.slideTo(imagesEventSlider.activeIndex);
      });
    }
  }

  // Reloader
  window.addEventListener('resize', () => {
    const DEVICE_WIDTH_RESIZE = window.innerWidth && document.documentElement.clientWidth
      ? Math.min(window.innerWidth, document.documentElement.clientWidth)
      : window.innerWidth
      || document.documentElement.clientWidth
      || document.getElementsByTagName('body')[0].clientWidth;

    if (DEVICE_WIDTH !== DEVICE_WIDTH_RESIZE) {
      document.location.reload();
    }
  });
};
