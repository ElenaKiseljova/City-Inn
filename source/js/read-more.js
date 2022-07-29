export default () => {
  const TABLET_WIDTH = 768;

  const DEVICE_WIDTH = window.innerWidth && document.documentElement.clientWidth
    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
    : window.innerWidth
    || document.documentElement.clientWidth
    || document.getElementsByTagName('body')[0].clientWidth;

  const text = document.querySelector('.info__text');
  const textMore = document.querySelector('.info__more');

  if (text && textMore && DEVICE_WIDTH < TABLET_WIDTH) {
    const defaultText = text.textContent;
    const shortText = `${text.textContent.substring(0, 117)}...`;

    text.textContent = shortText;

    textMore.addEventListener('click', () => {
      text.textContent = defaultText;

      textMore.classList.add('active');
    });
  }
};
