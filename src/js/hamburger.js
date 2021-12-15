import { isActive } from "./helper.js";

let fontSize = window
	.getComputedStyle(document.documentElement)
	.getPropertyValue("font-size")
	.replace("px", "");

export default class Hamburger {
	constructor(button, menu) {
		this.button = button;
		this.menu = menu;
		this.bars = button.querySelectorAll("span");
	}
	toggle(duration = 300) {
		if (isActive(this.menu)) {
			this.bars[0].style.top =
				"calc(50% - " + 3.6 / fontSize + "rem / 2)";
			this.bars[1].style.opacity = "0";
			this.bars[2].style.top =
				"calc(50% - " + 3.6 / fontSize + "rem / 2)";
			setTimeout(() => {
				if (isActive(this.menu)) {
					this.bars[0].style.transform = "rotate(-45deg)";
					this.bars[2].style.transform = "rotate(45deg)";
				}
			}, duration / 2);
		} else {
			this.bars[0].style.transform = "rotate(0deg)";
			this.bars[2].style.transform = "rotate(0deg)";
			setTimeout(() => {
				if (!isActive(this.menu)) {
					this.bars[0].style.top = "1.25rem";
					this.bars[1].style.opacity = "1";
					this.bars[2].style.top =
						"calc(100% - " + 3.6 / fontSize + "rem - 1.25rem)";
				}
			}, duration / 2);
		}
	}
}
