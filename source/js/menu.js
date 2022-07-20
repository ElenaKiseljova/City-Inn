export default () => {
  const changeActiveClass = (elements, doing = 'remove', activeClass = 'active') => {
    if (elements.length > 0) {
      elements.forEach((element) => {
        if (doing === 'remove') {
          element.classList.remove(activeClass);
        }

        if (doing === 'add') {
          element.classList.add(activeClass);
        }

        if (doing === 'toggle') {
          element.classList.toggle(activeClass);
        }
      });
    }
  };

  const rootElement = document.documentElement;

  const burger = document.querySelector('.burger');
  const pageHeaderMenu = document.querySelector('.page-header__menu');
  const logoHeader = document.querySelector('.logo--header');

  if (burger && pageHeaderMenu && logoHeader) {
    pageHeaderMenu.classList.add('loaded');

    const burgerLeft = burger.querySelector('.burger__left');
    const burgerRight = burger.querySelector('.burger__right');

    const pageHeaderButtons = document.querySelectorAll('.page-header__button');

    if (burgerLeft && burgerRight) {
      burger.addEventListener('click', () => {
        if (burger.classList.contains('active')) {
          pageHeaderMenu.classList.remove('active');

          burgerLeft.classList.remove('active');
          burgerRight.classList.remove('active');
          burger.classList.remove('active');

          logoHeader.classList.remove('active');

          changeActiveClass(pageHeaderButtons, 'remove', 'button--white-50-js');

          rootElement.classList.remove('active');
        } else {
          changeActiveClass(pageHeaderButtons, 'add', 'button--white-50-js');

          logoHeader.classList.add('active');

          pageHeaderMenu.classList.add('active');

          burgerLeft.classList.add('active');
          burgerRight.classList.add('active');
          burger.classList.add('active');

          rootElement.classList.add('active');
        }
      });
    }
  }

  const navItems = document.querySelectorAll('.nav__item');
  const navImages = document.querySelectorAll('.menu__picture');

  if (navItems.length > 0 && navImages.length > 0) {
    const defaultImage = navImages[0];

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
};
