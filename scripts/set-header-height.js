const header = document.querySelector('.header');

const debounce = (cb, delay) => {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(function () {
      cb(...args);
    }, delay);
  };
};

const setheaderheight = () => {
  if (!header) {
    return;
  }

  const headerHeight = header.offsetHeight;

  document.documentElement.style.setProperty(
    '--header-height',
    `${headerHeight}px`
  );

  window.addEventListener(
    'resize',
    debounce(() => {
      const headerHeight = header.offsetHeight;

      document.documentElement.style.setProperty(
        '--header-height',
        `${headerHeight}px`
      );
    }, 150)
  );
};

export { setheaderheight };
