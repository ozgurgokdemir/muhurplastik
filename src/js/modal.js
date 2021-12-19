export default class Modal {
	constructor(modal, open, close, product) {
		this.modal = modal;
		this.open = open;
		this.close = close;
		this.product = product;
	}
	toggle() {
		this.modal.classList.toggle("active");
		document.body.classList.toggle("noscroll");
	}
}
