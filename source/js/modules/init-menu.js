import { FocusLock } from '../utils/focus-lock';
import scrollLock from '../vendor/scroll-lock.min';

const focusLock = new FocusLock();

const breakpoint = window.matchMedia('(min-width: 1520px)');

const toggle = document.querySelector('.header__menu-toggle');
const nav = document.querySelector('.main-nav');

const initMenu = () => {
  if (!toggle || !nav) {
    return;
  }

  const overlay = nav.querySelector('.main-nav__overlay');

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
    toggle.classList.add('is-opened');
    nav.classList.add('is-opened');

    focusLock.lock('.main-nav', false);
    scrollLock.disablePageScroll();

    overlay.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onEscPress);
  };

  const closeMenu = () => {
    toggle.classList.remove('is-opened');
    nav.classList.remove('is-opened');

    focusLock.unlock(false);
    scrollLock.enablePageScroll();

    overlay.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onEscPress);
  };

  const onToggleMenu = () => {
    if (nav.classList.contains('is-opened')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const onNavClick = ({ target }) => {
    if (target.closest('.main-nav__link', '.main-nav__sublink')) {
      closeMenu();
    }
  };

  const breakpointChecker = () => {
    if (breakpoint.matches) {
      if (nav.classList.contains('is-opened')) {
        const subMenus = nav.querySelectorAll('.main-nav__submenu-list');

        subMenus.forEach(menu => menu.style.transition = 'none');

        setTimeout(() => {
          subMenus.forEach(menu => menu.style.transition = null);
        }, 10);

        closeMenu();
      }
    } else {
      const navInner = nav.querySelector('.main-nav__inner');

      nav.style.transition = 'none';
      navInner.style.transition = 'none';

      setTimeout(() => {
        nav.style.transition = null;
        navInner.style.transition = null;
      }, 10);
    }
  };

  breakpointChecker();
  breakpoint.addListener(breakpointChecker);

  toggle.addEventListener('click', onToggleMenu);
  nav.addEventListener('click', onNavClick);
};

export { initMenu };
