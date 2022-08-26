import changeActiveClass from './changeActiveClass';

export default () => {
  const rootElement = document.documentElement;

  const burger = document.querySelector('.burger');
  const pageHeaderMenu = document.querySelector('.page-header__menu');
  const logoHeader = document.querySelector('.logo--header');

  if (burger && pageHeaderMenu && logoHeader) {
    pageHeaderMenu.classList.add('loaded');

    const burgerLeft = burger.querySelector('.burger__left');
    const burgerRight = burger.querySelector('.burger__right');

    const pageHeaderButtons = document.querySelectorAll('.page-header__button');

    const navItems = document.querySelectorAll('.nav__item');
    const navImages = document.querySelectorAll('.menu__img');

    if (burgerLeft && burgerRight && navItems.length > 0 && navImages.length > 0) {
      const defaultImage = navImages[0];

      const onClickRoot = (evt) => {
        if (evt.target !== burger && !evt.target.closest('.call')) {
          burger.click();
        }
      };

      burger.addEventListener('click', () => {
        if (burger.classList.contains('active')) {
          pageHeaderMenu.classList.remove('active');

          burgerLeft.classList.remove('active');
          burgerRight.classList.remove('active');
          burger.classList.remove('active');

          logoHeader.classList.remove('active');

          changeActiveClass(pageHeaderButtons, 'remove', 'active');

          rootElement.classList.remove('active');

          rootElement.removeEventListener('click', onClickRoot);
        } else {
          changeActiveClass(navImages);

          defaultImage.classList.add('active');

          changeActiveClass(pageHeaderButtons, 'add', 'active');

          logoHeader.classList.add('active');

          pageHeaderMenu.classList.add('active');

          burgerLeft.classList.add('active');
          burgerRight.classList.add('active');
          burger.classList.add('active');

          rootElement.classList.add('active');

          rootElement.addEventListener('click', onClickRoot);
        }
      });

      navItems.forEach((navItem, index) => {
        const onMouseEnter = () => {
          changeActiveClass(navImages);

          navImages[index + 1].classList.add('active');
        };

        const onMouseLeave = () => {
          changeActiveClass(navImages);

          defaultImage.classList.add('active');
        };

        navItem.addEventListener('mouseenter', onMouseEnter);

        navItem.addEventListener('mouseleave', onMouseLeave);
      });
    }
  }
};
