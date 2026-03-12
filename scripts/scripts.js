import { ScrollLock } from './scroll-lock.js';
import { FocusLock } from './focus-lock.js';
import { initMenu } from './init-menu.js';
import { setheaderheight } from './set-header-height.js';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    window.scrollLock = new ScrollLock();
    window.focusLock = new FocusLock();

    initMenu();
    setheaderheight();
  },
  true
);
