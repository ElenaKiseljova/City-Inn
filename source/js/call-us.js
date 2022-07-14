export default () => {
  const callLink = document.querySelector('.call__link');

  if (callLink) {
    const callText = callLink.querySelector('.call__text');

    if (callText) {
      callLink.addEventListener('click', (evt) => {
        if (callLink.classList.contains('active')) {
          callText.textContent = callLink.dataset.text;
          callLink.classList.remove('active');
        } else {
          evt.preventDefault();

          callLink.classList.add('active');
          callText.textContent = callLink.dataset.phone;
        }
      });
    }
  }
};
