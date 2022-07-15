import gsap from './gsap.min';
import ScrollTrigger from './ScrollTrigger.min';

export default () => {
  gsap.registerPlugin(ScrollTrigger);

  const TABLET_WIDTH = 768;

  const DEVICE_WIDTH = window.innerWidth && document.documentElement.clientWidth
    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
    : window.innerWidth
    || document.documentElement.clientWidth
    || document.getElementsByTagName('body')[0].clientWidth;

  if (DEVICE_WIDTH < TABLET_WIDTH) {
    const imageContainers = document.querySelectorAll('.promo--home .promo__container--image, .promo--smart .promo__container--image');

    if (imageContainers.length > 0) {
      gsap.to(imageContainers, {
        y: 192,
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.promo',
          scrub: 1,
          // markers: true,
          start: 'top top',
          end: '98vh top',
        },
      });

      gsap.to('.page-header__social', {
        x: 0,
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.promo',
          scrub: 1,
          // markers: true,
          start: 'top top',
          end: '98vh top',
        },
      });
    }
  }
};
