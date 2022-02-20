import { isActive, targetHeight } from './helper.js';

export default class Dropdown {
  constructor({ container, button, hover, dropdown, chevron, userMedia }) {
    this.container = container;
    this.button = button;
    this.hover = hover;
    this.dropdown = dropdown;
    this.height = targetHeight(dropdown);
    this.chevron = chevron;
    this.userMedia = userMedia;
    this.addEventListeners();
  }

  toggle(duration = 200) {
    this.container.classList.toggle('active');
    this.button?.classList.toggle('active');
    this.hover?.classList.toggle('active');
    this.chevron?.forEach((element) => element.classList.toggle('active'));
    if (isActive(this.container)) {
      this.dropdown.style.visibility = 'visible';
      this.dropdown.style.height = this.height;
    } else {
      this.dropdown.style.height = this.height;
      setTimeout(() => {
        this.dropdown.style.height = '0px';
      }, 0);
      setTimeout(() => {
        if (!isActive(this.container)) {
          this.dropdown.style.visibility = 'hidden';
        }
      }, duration);
    }
  }

  show() {
    if (!isActive(this.container)) this.toggle(200);
  }

  hide() {
    if (isActive(this.container)) this.toggle(200);
  }

  focusIn() {
    if (this.container.matches(':focus-within')) this.show();
  }

  focusOut() {
    if (!this.container.matches(':focus-within')) this.hide();
  }

  reset() {
    this.container.classList.remove('active');
    this.button?.classList.remove('active');
    this.hover?.classList.remove('active');
    this.chevron.forEach((element) => element?.classList.add('active'));
    this.height = targetHeight(this.dropdown);
  }

  addEventListeners() {
    this.button?.addEventListener('click', () => this.toggle(200));
    if (this.hover === null) return;

    this.hover.addEventListener(
      'mouseenter',
      () => this.userMedia.device === 'desktop' && this.show()
    );
    this.container.addEventListener(
      'mouseleave',
      () => this.userMedia.device === 'desktop' && this.hide()
    );
    this.container.addEventListener(
      'focusin',
      () => this.userMedia.device === 'desktop' && this.focusIn()
    );
    this.container.addEventListener(
      'focusout',
      () => this.userMedia.device === 'desktop' && this.focusOut()
    );
  }
}
