import { isActive } from './helper.js';
import UserMedia from './userMedia.js';
import Hamburger from './hamburger.js';
import Dropdown from './dropdown.js';

const { body } = document;

const userMedia = new UserMedia();
userMedia.initiate();

const hamburgerToggle = document.querySelector('.js-hamburger-toggle');
const hamburgerMenu = document.querySelector('.js-hamburger-menu');
const hamburgerTransition = {
  property: 'transform',
  duration: '300ms',
  timing: 'ease-in-out',
};

const hamburger = new Hamburger(
  hamburgerToggle,
  hamburgerMenu,
  hamburgerTransition
);

const dropdownContainers = document.querySelectorAll('.js-dropdown-container');

const getDropdown = (element) =>
  new Dropdown({
    container: element,
    button: element.querySelector('.js-dropdown-button'),
    hover: element.querySelector('.js-dropdown-hover'),
    dropdown: element.querySelector('.js-dropdown'),
    chevron: element.querySelectorAll('.chevron'),
  });

const dropdowns = [...dropdownContainers].map(getDropdown);

hamburger.button.addEventListener('click', () => {
  hamburger.menu.classList.toggle('active');
  body.classList.toggle('noscroll');
  hamburger.toggle();
});

const resetStyles = () => {
  // reset dropdowns global
  dropdowns.forEach((dropdown) => dropdown.reset());

  if (userMedia.device === 'desktop') {
    // reset hamburger menu for desktop
    hamburger.reset();
  } else {
    // reset hamburger menu for mobile
    hamburger.reset();
  }
};

window.addEventListener('resize', () => {
  const deviceBeforeUpdate = userMedia.device;
  // update current media
  userMedia.update();
  // reset styles when breakpoint
  if (deviceBeforeUpdate !== userMedia.device) resetStyles();
});

window.addEventListener('click', (event) => {
  // close menu when clicked to overlay
  if (isActive(hamburger.menu) && event.target === hamburger.menu) {
    hamburger.menu.classList.remove('active');
    body.classList.remove('noscroll');
    hamburger.toggle();
  }
});

const dropdownHandler = (element, callback) => {
  if (userMedia.device !== 'desktop') return;
  callback(element);
};

const showDropdown = (element) => {
  if (isActive(element.container)) return;
  element.toggle(200);
};
const hideDropdown = (element) => {
  if (!isActive(element.container)) return;
  element.toggle(200);
};

const focusInDropdown = (element) => {
  if (!element.container.matches(':focus-within')) return;
  showDropdown(element);
};
const focusOutDropdown = (element) => {
  if (element.container.matches(':focus-within')) return;
  hideDropdown(element);
};

const addDropdownEventListeners = (element) => {
  // open dropdown when hovered
  element.hover.addEventListener(
    'mouseenter',
    dropdownHandler.bind(this, element, showDropdown)
  );
  // close dropdown when mouse leave
  element.container.addEventListener(
    'mouseleave',
    dropdownHandler.bind(this, element, hideDropdown)
  );
  // open dropdown when focused
  element.container.addEventListener(
    'focusin',
    dropdownHandler.bind(this, element, focusInDropdown)
  );
  // close dropdown when focus out
  element.container.addEventListener(
    'focusout',
    dropdownHandler.bind(this, element, focusOutDropdown)
  );
};

dropdowns.forEach((element) => {
  // toggle dropdown when clicked
  element.button?.addEventListener('click', () => element.toggle(200));
  // toggle dropdown when hovered or focused
  if (element.hover !== null) addDropdownEventListeners(element);
});

const initiateSlider = (Slider) => {
  const slider = new Slider({
    monitor: document.querySelector('.js-product-image-monitor img'),
    slides: document.querySelectorAll('.js-product-image-slides img'),
  });

  slider.slides.forEach((slide) => {
    slide.addEventListener('click', () => slider.slide(slide));
  });
};

const initiateModal = (Modal) => {
  const modal = new Modal({
    modal: document.querySelector('.js-modal'),
    open: document.querySelector('.js-modal-open'),
    close: document.querySelector('.js-modal-close'),
    product: document.querySelector('.js-modal-product'),
  });

  modal.product.value = document.querySelector('.js-product-name').innerText;

  modal.open.addEventListener('click', () => modal.toggle());

  modal.close.addEventListener('click', () => modal.toggle());

  window.addEventListener('click', (event) => {
    if (event.target === modal.modal) modal.toggle();
  });
};

if (/(?<=urun).*/.test(window.location.href)) {
  import('./slider').then(({ default: Slider }) => initiateSlider(Slider));
  import('./modal').then(({ default: Modal }) => initiateModal(Modal));
}
