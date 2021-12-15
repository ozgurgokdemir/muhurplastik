import { isActive } from "./helper.js";

export default class Dropdown {
	constructor(container, button, hover, dropdown, height, chevron) {
		this.container = container;
		this.button = button;
		this.hover = hover;
		this.dropdown = dropdown;
		this.height = height;
		this.chevron = chevron;
	}
	toggle(duration = 200) {
		this.container.classList.toggle("active");
		this.button?.classList.toggle("active");
		this.hover?.classList.toggle("active");
		this.chevron?.forEach((element) => element.classList.toggle("active"));
		if (isActive(this.container)) {
			this.dropdown.style.visibility = "visible";
			this.dropdown.style.height = this.height;
		} else {
			this.dropdown.style.height = this.height;
			setTimeout(() => {
				this.dropdown.style.height = "0px";
			}, 0);
			setTimeout(() => {
				if (!isActive(this.container)) {
					this.dropdown.style.visibility = "hidden";
				}
			}, duration);
		}
	}
}
