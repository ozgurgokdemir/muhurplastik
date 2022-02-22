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
    window.addEventListener('click', (e) => {
      const conditions =
        e.target === this.modal ||
        e.target === this.openButton ||
        this.closeButton.contains(e.target);
      if (conditions) this.toggle();
    });
  }
}
