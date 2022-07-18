export default () => {
  const cards = document.querySelectorAll('.cards__item');

  if (cards.length > 0) {
    cards.forEach((card) => {
      const cardTop = card.querySelector('.cards__top');
      const cardBottom = card.querySelector('.cards__bottom');

      if (cardTop && cardBottom) {
        card.addEventListener('click', (evt) => {
          if (!evt.target.classList.contains('swiper-pagination-bullet')) {
            if (cardTop.classList.contains('active')) {
              cardTop.classList.remove('active');
              cardBottom.classList.remove('active');
            } else {
              cardTop.classList.add('active');
              cardBottom.classList.add('active');
            }
          }
        });
      }
    });
  }
};
