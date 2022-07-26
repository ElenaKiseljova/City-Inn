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

export default changeActiveClass;
