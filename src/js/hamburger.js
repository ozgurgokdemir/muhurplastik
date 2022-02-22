import UserMedia from './UserMedia.js';
import { isActive } from './helper.js';

const transition = {
  button: {
    property: ['transform', 'opacity', 'top'],
    duration: 150,
    timing: 'ease-in-out',
  },
  menu: {
    property: ['transform'],
    duration: 300,
    timing: 'ease-in-out',
  },
};

const getTransitionString = (element) => {
  const { property, duration, timing } = transition[element];
  return property.map((prop) => `${duration}ms ${prop} ${timing}`).join(', ');
};

export default class Hamburger {
  constructor() {
    this.button = document.querySelector('.js-hamburger-toggle');
    this.bars = this.button.querySelectorAll('span');
    this.menu = document.querySelector('.js-hamburger-menu');

    this.buttonTransition = getTransitionString('button');
    this.menuTransition = getTransitionString('menu');

    this.setTransitions();
    this.addEventListeners();
  }

  toggle(e) {
    if (e.target !== this.menu && !this.button.contains(e.target)) return;
    this[isActive(this.menu) ? 'close' : 'open'](e);
    this.menu.classList.toggle('active');
    document.body.classList.toggle('noscroll');
  }

  open() {
    this.bars[0].style.top = `calc(50% - ${3.6 / UserMedia.fontSize}rem / 2)`;
    this.bars[1].style.opacity = '0';
    this.bars[2].style.top = `calc(50% - ${3.6 / UserMedia.fontSize}rem / 2)`;
    setTimeout(() => {
      if (isActive(this.menu)) {
        this.bars[0].style.transform = 'rotate(-45deg)';
        this.bars[2].style.transform = 'rotate(45deg)';
      }
    }, transition.button.duration);
  }

  close() {
    this.bars[0].style.transform = 'rotate(0deg)';
    this.bars[2].style.transform = 'rotate(0deg)';
    setTimeout(() => {
      if (!isActive(this.menu)) {
        this.bars[0].style.top = '1.25rem';
        this.bars[1].style.opacity = '1';
        this.bars[2].style.top = `calc(100% - ${
          3.6 / UserMedia.fontSize
        }rem - 1.25rem)`;
      }
    }, transition.button.duration);
  }

  reset() {
    this.menu.classList.remove('active');
    this.clearTransitions();
    setTimeout(() => this.setTransitions(), 0);
  }

  setTransitions() {
    this.menu.style.transition = this.menuTransition;
    this.bars.forEach((bar) => (bar.style.transition = this.buttonTransition));
  }

  clearTransitions() {
    this.menu.style.removeProperty('transition');
    this.bars.forEach((bar) => {
      bar.style.removeProperty('transition');
    });
  }

  addEventListeners() {
    this.button.addEventListener('click', this.toggle.bind(this));
    this.menu.addEventListener('click', this.toggle.bind(this));
  }
}
