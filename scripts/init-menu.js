const breakpoint = window.matchMedia('(min-width: 1280px)');

const nav = document.querySelector('.main-nav');

const initMenu = () => {
  if (!nav) {
    return;
  }

  const overlay = nav.querySelector('.main-nav__overlay');
  const menuInner = nav.querySelector('.main-nav__menu-inner');
  const toggle = nav.querySelector('.main-nav__toggle');

  const onOverlayClick = () => {
    closeMenu();
  };

  const onEscPress = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      closeMenu();
    }
  };

  const openMenu = () => {
    nav.classList.add('is-opened');

    window.focusLock.lock('.main-nav', false);
    window.scrollLock.disableScrolling();

    overlay.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onEscPress);
  };

  const closeMenu = () => {
    nav.classList.remove('is-opened');

    window.focusLock.unlock(false);
    window.scrollLock.enableScrolling();

    overlay.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onEscPress);
  };

  const toggleMenu = () => {
    if (nav.classList.contains('is-opened')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const breakpointChecker = () => {
    if (breakpoint.matches) {
      if (nav.classList.contains('is-opened')) {
        closeMenu();
      }
    } else {
      menuInner.style.transition = 'none';

      setTimeout(() => {
        menuInner.style.transition = null;
      }, 10);
    }
  };

  breakpointChecker();
  breakpoint.addEventListener('change', breakpointChecker);

  toggle.addEventListener('click', toggleMenu);
};

export { initMenu };
