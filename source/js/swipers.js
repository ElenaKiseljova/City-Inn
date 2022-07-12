import Swiper from './swiper-bundle.min';

export default () => {
  const swipers = document.querySelectorAll('.swiper');

  swipers.forEach((swiperItem) => {
    const swiperSlider = new Swiper(swiperItem, {
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      // Navigation arrows
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
    });

    console.log(swiperSlider);
  });
};
