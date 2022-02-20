export default class Gallery {
  constructor({ image, thumbnails }) {
    this.image = image;
    this.thumbnails = [...thumbnails];
    this.previousImage = undefined;
    // eslint-disable-next-line prefer-destructuring
    this.currentImage = thumbnails[0];
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
