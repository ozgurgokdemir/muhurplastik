export default class Slider {
  constructor({ monitor, slides }) {
    this.monitor = monitor;
    this.slides = [...slides];
    this.previous = undefined;
    this.current = [...slides].at(0);
  }

  slide(slide) {
    this.current.classList.remove('active');
    this.previous = this.current;
    this.current = slide;

    const slideAttr = slide.getAttribute('src');
    this.monitor.setAttribute('src', slideAttr);
    this.current.classList.add('active');
  }
}
