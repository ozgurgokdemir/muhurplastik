export default class Modal {
  constructor() {
    this.modal = document.querySelector('.js-modal');
    this.openButton = document.querySelector('.js-modal-open');
    this.closeButton = document.querySelector('.js-modal-close');
    this.productName = document.querySelector('.js-product-name').innerText;
    this.productId = document.querySelector('.js-product-id').innerText;
    this.product = document.querySelector('.js-modal-product');
    this.product.value = `${this.productId} - ${this.productName}`;
    this.handleClick = this.handleClick.bind(this);
    this.addEventListeners();
  }

  toggle() {
    this.modal.classList.toggle('active');
    document.body.classList.toggle('noscroll');
  }

  handleClick(e) {
    const isConditionsMet =
      e.target === this.modal ||
      e.target === this.openButton ||
      this.closeButton.contains(e.target);
    if (isConditionsMet) this.toggle();
  }

  addEventListeners() {
    window.addEventListener('click', this.handleClick);
  }
}
