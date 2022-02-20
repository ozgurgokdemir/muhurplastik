import UserMedia from './userMedia.js';
import Hamburger from './hamburger.js';
import Dropdown from './dropdown.js';

const userMedia = new UserMedia();

const hamburger = new Hamburger({
  button: document.querySelector('.js-hamburger-toggle'),
  menu: document.querySelector('.js-hamburger-menu'),
  transition: {
    property: 'transform',
    duration: '300ms',
    timing: 'ease-in-out',
  },
});

const dropdownContainers = document.querySelectorAll('.js-dropdown-container');

const getDropdown = (element) =>
  new Dropdown({
    container: element,
    button: element.querySelector('.js-dropdown-button'),
    hover: element.querySelector('.js-dropdown-hover'),
    dropdown: element.querySelector('.js-dropdown'),
    chevron: element.querySelectorAll('.chevron'),
    userMedia,
  });

const dropdowns = [...dropdownContainers].map(getDropdown);

const resetComponents = () => {
  dropdowns.forEach((dropdown) => dropdown.reset());
  hamburger.reset();
};

const handleResize = () => {
  const deviceBeforeUpdate = userMedia.device;
  userMedia.update();
  if (deviceBeforeUpdate !== userMedia.device) resetComponents();
};

window.addEventListener('resize', handleResize);

const handleGallery = (Gallery) =>
  new Gallery({
    image: document.querySelector('.js-product-image img'),
    thumbnails: document.querySelectorAll('.js-product-thumbnails img'),
  });

const handleModal = (Modal) =>
  new Modal({
    modal: document.querySelector('.js-modal'),
    openButton: document.querySelector('.js-modal-open'),
    closeButton: document.querySelector('.js-modal-close'),
    product: document.querySelector('.js-modal-product'),
    productName: document.querySelector('.js-product-name').innerText,
  });

if (document.querySelector('main.product-page')) {
  import('./gallery').then(({ default: Gallery }) => handleGallery(Gallery));
  import('./modal').then(({ default: Modal }) => handleModal(Modal));
}
