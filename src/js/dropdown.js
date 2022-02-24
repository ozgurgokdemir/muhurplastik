import { isActive, targetHeight } from './utility.js';
import UserMedia from './UserMedia.js';

export default class Dropdown {
  constructor(container) {
    this.container = container;
    this.button = container.querySelector('.js-dropdown-button');
    this.hover = container.querySelector('.js-dropdown-hover');
    this.dropdown = container.querySelector('.js-dropdown');
    this.height = targetHeight(this.dropdown);
    this.chevron = container.querySelectorAll('.chevron');
    this.duration = 200;

    this.toggle = this.toggle.bind(this);
    this.handleMouse = this.handleMouse.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.addEventListeners();
  }

  toggle() {
    this[isActive(this.container) ? 'hide' : 'show']();
  }

  show() {
    this.toggleActive();
    this.dropdown.style.visibility = 'visible';
    this.dropdown.style.height = this.height;
  }

  hide() {
    this.toggleActive();
    this.dropdown.style.height = this.height;
    setTimeout(() => {
      this.dropdown.style.height = '0px';
    }, 0);
    setTimeout(() => {
      if (!isActive(this.container)) {
        this.dropdown.style.visibility = 'hidden';
      }
    }, this.duration);
  }

  toggleActive() {
    this.container.classList.toggle('active');
    this.button.classList.toggle('active');
    this.hover?.classList.toggle('active');
    this.chevron?.forEach((element) => element.classList.toggle('active'));
  }

  handleMouse(e) {
    if (this.hover === e.target && !isActive(this.container)) this.show();
    if (this.container === e.target && isActive(this.container)) this.hide();
  }

  handleFocus() {
    if (this.container.matches(':focus-within') && !isActive(this.container))
      this.show();
    if (!this.container.matches(':focus-within') && isActive(this.container))
      this.hide();
  }

  reset() {
    this.container.classList.remove('active');
    this.button?.classList.remove('active');
    this.hover?.classList.remove('active');
    this.chevron.forEach((element) => element?.classList.add('active'));
    this.height = targetHeight(this.dropdown);
    this.removeEventListeners();
    setTimeout(() => this.addEventListeners(), 0);
  }

  addEventListeners() {
    this.button?.addEventListener('click', this.toggle);

    if (UserMedia.device === UserMedia.DEVICE_ENUMS.MOBILE || !this.hover)
      return;

    this.container.addEventListener('mouseenter', this.handleMouse, {
      capture: true,
    });
    this.container.addEventListener('mouseleave', this.handleMouse);
    this.container.addEventListener('focusin', this.handleFocus);
    this.container.addEventListener('focusout', this.handleFocus);
  }

  removeEventListeners() {
    this.button?.removeEventListener('click', this.toggle);
    this.container.removeEventListener('mouseenter', this.handleMouse, {
      capture: true,
    });
    this.container.removeEventListener('mouseleave', this.handleMouse);
    this.container.removeEventListener('focusin', this.handleFocus);
    this.container.removeEventListener('focusout', this.handleFocus);
  }
}
