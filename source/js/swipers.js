import gsap from './gsap.min';
import Swiper from './swiper-bundle.min';
import changeActiveClass from './changeActiveClass';

export default () => {
  const TABLET_WIDTH = 768;
  const DESKTOP_WIDTH = 1366;

  const DEVICE_WIDTH = window.innerWidth && document.documentElement.clientWidth
    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
    : window.innerWidth
    || document.documentElement.clientWidth
    || document.getElementsByTagName('body')[0].clientWidth;

  const animationSlideElements = (swiperSlider, selector1, selector2) => {
    const el1 = swiperSlider.slides[swiperSlider.activeIndex].querySelector(selector1);
    const el2 = swiperSlider.slides[swiperSlider.activeIndex].querySelector(selector2);

    if (el1 && el2) {
      gsap.to(el1, {
        x: 0,
        opacity: 1,
        duration: 1,
      });

      gsap.to(el2, {
        x: 0,
        opacity: 1,
        duration: 1,
      });
    }

    if (swiperSlider.previousIndex !== undefined) {
      const el3 = swiperSlider.slides[swiperSlider.previousIndex].querySelector(selector1);
      const el4 = swiperSlider.slides[swiperSlider.previousIndex].querySelector(selector2);

      if (el3 && el4) {
        gsap.to(el3, {
          x: '-100%',
          opacity: 0,
          duration: 1,
        });

        gsap.to(el4, {
          x: '100%',
          opacity: 0,
          duration: 1,
        });
      }
    }
  };

  const changeFoodTab = (swiperSlider, numbers = [], texts = []) => {
    const index = swiperSlider.activeIndex ?? 0;

    if (numbers[index] && texts[index]) {
      changeActiveClass(numbers);
      numbers[index].classList.add('active');

      changeActiveClass(texts);
      texts[index].classList.add('active');
    }
  };

  const swiperInit = (swiperItem, attr = {}) => {
    const newAttr = { ...attr };

    // Rooms sliders
    if (swiperItem.classList.contains('rooms__slider') && (DEVICE_WIDTH >= TABLET_WIDTH)) {
      return;
    }

    let prevButton = null;
    let nextButton = null;
    let pagination = null;

    const swiperArgs = {
      slidesPerView: 1,
      spaceBetween: 0,
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
      if (DEVICE_WIDTH < TABLET_WIDTH) {
        pagination = swiperItem.closest('.cosy').querySelector('.cosy__pagination--mobile');
      } else {
        pagination = swiperItem.closest('.cosy').querySelector('.cosy__pagination--tablet');
      }
    }

    if (swiperItem.classList.contains('food__slider')) {
      if (DEVICE_WIDTH < TABLET_WIDTH) {
        pagination = swiperItem.closest('.food').querySelector('.food__pagination--mobile');
      } else {
        pagination = swiperItem.closest('.food').querySelector('.food__pagination--tablet');
      }

      if (DEVICE_WIDTH > TABLET_WIDTH) {
        swiperArgs.spaceBetween = 75;
      }
    }

    // Lobby sliders
    if (swiperItem.classList.contains('doings__slider')) {
      if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        swiperArgs.spaceBetween = 270;
      }
    }

    // Standart sliders
    if (swiperItem.classList.contains('gallery__slider')) {
      newAttr.breakpoints = {
        // when window width is >= 768px
        768: {
          spaceBetween: 36,
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
          },
        },
        // when window width is >= 1366px
        1366: {
          spaceBetween: 320,
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
          },
        },
      };
    }

    if (!pagination) {
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
        // when window width is >= 1366px
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
      ...newAttr,
    };

    const swiperSlider = new Swiper(swiperItem, swiperArgsMerged);

    // Lobby sliders
    if (swiperItem.classList.contains('doings__slider')) {
      if (DEVICE_WIDTH >= TABLET_WIDTH && DEVICE_WIDTH < DESKTOP_WIDTH) {
        animationSlideElements(swiperSlider, '.doings__img-wrapper', '.doings__content');

        swiperSlider.on('beforeTransitionStart', () => {
          animationSlideElements(swiperSlider, '.doings__img-wrapper', '.doings__content');
        });
      } else if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        let maxHeightSlide = 0;

        swiperSlider.slides.forEach((slide) => {
          if (slide.offsetHeight > maxHeightSlide) {
            maxHeightSlide = slide.offsetHeight;
          }
        });

        swiperSlider.el.style.minHeight = `${maxHeightSlide} px`;
      }
    }

    // Food sliders
    if (swiperItem.classList.contains('food__slider')) {
      if (swiperItem.closest('.food--about')) {
        const foodNumberTabs = swiperItem.closest('.food--about').querySelectorAll('.food__tab-number');
        const foodTextTabs = swiperItem.closest('.food--about').querySelectorAll('.food__tab-text');

        changeFoodTab(swiperSlider, foodNumberTabs, foodTextTabs);

        swiperSlider.on('slideChange', () => {
          changeFoodTab(swiperSlider, foodNumberTabs, foodTextTabs);
        });
      }
    }

    return swiperSlider;
  };

  // Swipers not Events slider
  const swipers = document.querySelectorAll('.swiper:not(.event__slider)');

  swipers.forEach((swiperItem) => {
    swiperInit(swiperItem);
  });

  // Events sliders
  const eventSlidersImages = document.querySelectorAll('.event__slider--images');

  if (eventSlidersImages.length > 0) {
    eventSlidersImages.forEach((eventSliderImages) => {
      const attrImages = {};

      if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        attrImages.spaceBetween = 280;
      }

      const imagesEventSlider = swiperInit(eventSliderImages, attrImages);

      const eventSliderText = eventSliderImages.closest('.event').querySelector('.event__slider--text');

      if (eventSliderText) {
        const attrText = {
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          breakpoints: {
            // when window width is >= 1366px
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
    });
  }

  // Standart
  const featuresIconsSlider = document.querySelector('.features__icons');

  if (featuresIconsSlider && DEVICE_WIDTH < TABLET_WIDTH) {
    const pagination = featuresIconsSlider.querySelector('.swiper-pagination');

    const swiperArgs = {
      slidesPerView: 2,
      spaceBetween: 24,
      grid: {
        rows: 2,
        fill: 'row',
      },
      pagination: {
        el: pagination,
        clickable: true,
      },
    };

    const featuresIconsSwiper = new Swiper(featuresIconsSlider, swiperArgs);
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
