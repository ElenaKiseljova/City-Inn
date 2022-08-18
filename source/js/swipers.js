import { gsap } from './libs/gsap.min';
import Swiper from './libs/swiper-bundle.min';
import changeActiveClass from './changeActiveClass';
import cardsActivate from './cards';

export default () => {
  const TABLET_WIDTH = 768;
  const DESKTOP_WIDTH = 1366;

  const DEVICE_WIDTH = window.innerWidth && document.documentElement.clientWidth
    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
    : window.innerWidth
    || document.documentElement.clientWidth
    || document.getElementsByTagName('body')[0].clientWidth;

  const animationSlideElements = (swiperSlider, selector1, selector2, mode = 1) => {
    const el1 = swiperSlider.slides[swiperSlider.activeIndex].querySelector(selector1);
    const el2 = swiperSlider.slides[swiperSlider.activeIndex].querySelector(selector2);

    if (el1 && el2) {
      gsap.to(el1, {
        x: 0,
        opacity: 1,
        duration: 1,
      });

      switch (mode) {
        case 1:
          gsap.to(el2, {
            x: 0,
            opacity: 1,
            duration: 1,
          });

          break;

        case 2:
          gsap.to(el2, {
            opacity: 1,
            duration: 1,
            ease: 'Power3.easeOut',
          });

          break;

        default:
          break;
      }
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

        switch (mode) {
          case 1:
            gsap.to(el4, {
              x: '100%',
              opacity: 0,
              duration: 1,
            });

            break;

          case 2:
            gsap.to(el4, {
              opacity: 0,
              duration: 1,
              ease: 'Power3.easeOut',
            });

            break;

          default:
            break;
        }
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
    // Sliders destroy
    if (swiperItem.classList.contains('rooms__slider') && (DEVICE_WIDTH >= TABLET_WIDTH)) {
      return;
    }

    if (swiperItem.classList.contains('types__slider') && (DEVICE_WIDTH >= TABLET_WIDTH && DEVICE_WIDTH < DESKTOP_WIDTH)) {
      cardsActivate('types', '.types__slide');

      return;
    }

    const newAttr = { ...attr };

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
    if (swiperItem.classList.contains('food__slider')) {
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

    // Conference services sliders
    if (swiperItem.classList.contains('types__slider')) {
      if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        swiperArgs.spaceBetween = 40;
      }
    }

    // Group sliders
    if (swiperItem.classList.contains('team__slider')) {
      if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        swiperArgs.spaceBetween = 51;
      }
    }

    // Autoplay + fade sliders
    if (swiperItem.classList.contains('banquet__slider')
      || swiperItem.classList.contains('mission__slider')
      || swiperItem.classList.contains('seating__slider')) {
      newAttr.effect = 'fade';
      newAttr.fadeEffect = {
        crossFade: true,
      };

      if (DEVICE_WIDTH > TABLET_WIDTH) {
        newAttr.autoplay = {
          delay: 5000,
        };
      }
    }

    // Autoplay sliders
    if (swiperItem.classList.contains('spa__slider')
      || swiperItem.classList.contains('gym__slider')
      || swiperItem.classList.contains('prices__slider')) {
      if (DEVICE_WIDTH > TABLET_WIDTH) {
        newAttr.autoplay = {
          delay: 5000,
        };
      }
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

    // Половинчатые двойные (картинка +  текст) слайдеры СТАРТ
    // Lobby
    if (swiperItem.classList.contains('doings__slider')) {
      if (DEVICE_WIDTH >= TABLET_WIDTH && DEVICE_WIDTH < DESKTOP_WIDTH) {
        animationSlideElements(swiperSlider, '.doings__top', '.doings__bottom');

        swiperSlider.on('beforeTransitionStart', () => {
          animationSlideElements(swiperSlider, '.doings__top', '.doings__bottom');
        });
      } else if (DEVICE_WIDTH >= DESKTOP_WIDTH) {
        let maxHeightSlide = 0;

        swiperSlider.slides.forEach((slide) => {
          if (slide.offsetHeight > maxHeightSlide) {
            maxHeightSlide = slide.offsetHeight;
          }
        });

        swiperSlider.el.style.minHeight = `${maxHeightSlide}px`;
      }
    }

    // Group
    if (swiperItem.classList.contains('team__slider')) {
      if (DEVICE_WIDTH >= TABLET_WIDTH && DEVICE_WIDTH < DESKTOP_WIDTH) {
        animationSlideElements(swiperSlider, '.team__top', '.team__bottom');

        swiperSlider.on('beforeTransitionStart', () => {
          animationSlideElements(swiperSlider, '.team__top', '.team__bottom');
        });
      }
    }

    // Conference
    if (swiperItem.classList.contains('seating__slider')) {
      if (DEVICE_WIDTH >= TABLET_WIDTH) {
        animationSlideElements(swiperSlider, '.seating__bottom', '.seating__top', 2);

        swiperSlider.on('beforeTransitionStart', () => {
          animationSlideElements(swiperSlider, '.seating__bottom', '.seating__top', 2);
        });
      }
    }

    if (swiperItem.classList.contains('prices__slider')) {
      if (DEVICE_WIDTH >= TABLET_WIDTH) {
        animationSlideElements(swiperSlider, '.prices__top', '.prices__bottom', 1);

        swiperSlider.on('beforeTransitionStart', () => {
          animationSlideElements(swiperSlider, '.prices__top', '.prices__bottom', 1);
        });
      }
    }

    // Половинчатые двойные (картинка +  текст) слайдеры КОНЕЦ

    // Food sliders
    if (swiperItem.classList.contains('food__slider')) {
      const foodNumberTabs = swiperItem.closest('section').querySelectorAll('.food__tab-number');
      const foodTextTabs = swiperItem.closest('section').querySelectorAll('.food__tab-text');

      if (foodNumberTabs.length > 0 && foodTextTabs.length > 0) {
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
        if (eventSliderImages.classList.contains('event__slider--group')) {
          attrImages.spaceBetween = 246;
        } else {
          attrImages.spaceBetween = 280;
        }
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
