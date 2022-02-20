import { isActive } from './helper.js';

const fontSize = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue('font-size')
  .replace('px', '');

export default class Hamburger {
  constructor({ button, menu, transition: { duration, property, timing } }) {
    this.transition = `${duration} ${property} ${timing}`;
    this.duration = duration;
    this.button = button;
    this.menu = menu;
    this.menu.style.transition = this.transition;
    this.bars = button.querySelectorAll('span');
    this.addEventListeners();
  }

  toggle() {
    this.menu.classList.toggle('active');
    document.body.classList.toggle('noscroll');
    if (isActive(this.menu)) {
      this.bars[0].style.top = `calc(50% - ${3.6 / fontSize}rem / 2)`;
      this.bars[1].style.opacity = '0';
      this.bars[2].style.top = `calc(50% - ${3.6 / fontSize}rem / 2)`;
      setTimeout(() => {
        if (isActive(this.menu)) {
          this.bars[0].style.transform = 'rotate(-45deg)';
          this.bars[2].style.transform = 'rotate(45deg)';
        }
      }, this.duration / 2);
    } else {
      this.bars[0].style.transform = 'rotate(0deg)';
      this.bars[2].style.transform = 'rotate(0deg)';
      setTimeout(() => {
        if (!isActive(this.menu)) {
          this.bars[0].style.top = '1.25rem';
          this.bars[1].style.opacity = '1';
          this.bars[2].style.top = `calc(100% - ${
            3.6 / fontSize
          }rem - 1.25rem)`;
        }
      }, this.duration / 2);
    }
  }

  close(e) {
    if (!isActive(this.menu)) return;
    if (e.target === this.menu) this.toggle();
  }

  reset() {
    this.menu.classList.remove('active');
    this.menu.style.removeProperty('transform');
    this.menu.style.removeProperty('transition');
    this.bars.forEach((bar) => {
      bar.style.removeProperty('transform');
      bar.style.removeProperty('top');
      bar.style.removeProperty('opacity');
    });

    setTimeout(() => (this.menu.style.transition = this.transition), 0);
  }

  addEventListeners() {
    this.button.addEventListener('click', this.toggle.bind(this));
    this.menu.addEventListener('click', this.close.bind(this));
  }
}
