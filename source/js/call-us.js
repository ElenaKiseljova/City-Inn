// import regeneratorRuntime from "regenerator-runtime/runtime.js";

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

  // async function fetchData() {
  //   const response = await fetch('https://osnova.webnauts.pro/city-inn/structure/header.json');
  //   if (!response.ok) {
  //     const message = `An error has occured: ${response.status}`;
  //     throw new Error(message);
  //   }
  //   // waits until the request completes...
  //   const data = await response.json();
  //   console.log(data);
  // }

  // fetchData();
};
