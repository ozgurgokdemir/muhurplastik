import UserMedia from './UserMedia.js';
import Hamburger from './Hamburger.js';
import Dropdown from './Dropdown.js';

const hamburger = new Hamburger();

const dropdownContainers = document.querySelectorAll('.js-dropdown-container');

const dropdowns = [...dropdownContainers].map((e) => new Dropdown(e));

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

const resetComponents = () => {
  hamburger.reset();
  dropdowns.forEach((dropdown) => dropdown.reset());
};

const handleBreakpoint = () => {
  const deviceBeforeUpdate = UserMedia.device;
  UserMedia.update();
  if (deviceBeforeUpdate !== UserMedia.device) resetComponents();
};

window.addEventListener('resize', handleBreakpoint);
