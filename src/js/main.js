import UserMedia from './UserMedia.js';
import Hamburger from './Hamburger.js';
import Dropdown from './Dropdown.js';

const hamburger = new Hamburger();

const dropdownContainers = document.querySelectorAll('.js-dropdown-container');
const dropdowns = [...dropdownContainers].map((e) => new Dropdown(e));

if (document.querySelector('main.product-page')) {
  import('./Gallery').then(({ default: Gallery }) => new Gallery());
  import('./Modal').then(({ default: Modal }) => new Modal());
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
