export default class Gallery {
  constructor() {
    this.image = document.querySelector('.js-product-image img');
    this.thumbnails = document.querySelectorAll('.js-product-thumbnails img');
    this.previousImage = undefined;
    this.currentImage = this.thumbnails[0];
    this.currentImage.classList.add('active');
    this.addEventListeners();
  }

  display(thumbnail) {
    this.currentImage.classList.remove('active');
    this.previousImage = this.currentImage;
    this.currentImage = thumbnail;

    const thumbAttr = thumbnail.getAttribute('src');
    this.image.setAttribute('src', thumbAttr);
    this.currentImage.classList.add('active');
  }

  addEventListeners() {
    this.thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener('click', () => this.display(thumbnail));
    });
  }
}
