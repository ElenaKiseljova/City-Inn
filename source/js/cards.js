const cardsActivate = (sectionName = 'cards', cardSelector = '.cards__item') => {
  let lastTimeout;

  const cards = document.querySelectorAll(`${cardSelector}`);

  if (cards.length > 0) {
    cards.forEach((card) => {
      const cardTop = card.querySelector(`.${sectionName}__top`);
      const cardBottom = card.querySelector(`.${sectionName}__bottom`);

      if (cardTop && cardBottom) {
        card.addEventListener('click', (evt) => {
          if (!evt.target.classList.contains('swiper-pagination-bullet')) {
            card.classList.add('active');

            if (cardTop.classList.contains('active')) {
              cardTop.classList.remove('active');
              cardBottom.classList.remove('active');
            } else {
              cardTop.classList.add('active');
              cardBottom.classList.add('active');
            }
          }

          if (lastTimeout) {
            clearTimeout(lastTimeout);
          }

          lastTimeout = setTimeout(() => card.classList.remove('active'), 1000);
        });
      }
    });
  }
};

export default cardsActivate;
