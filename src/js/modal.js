export default class Modal {
  constructor({ modal, openButton, closeButton, product, productName }) {
    this.modal = modal;
    this.openButton = openButton;
    this.closeButton = closeButton;
    this.product = product;
    this.product.value = productName;
    this.addEventListeners();
  }

  toggle() {
    this.modal.classList.toggle('active');
    document.body.classList.toggle('noscroll');
  }

  addEventListeners() {
    this.openButton.addEventListener('click', () => this.toggle());
    this.closeButton.addEventListener('click', () => this.toggle());
    window.addEventListener('click', (e) => {
      if (e.target === this.modal) this.toggle();
    });
  }
}
