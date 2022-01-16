import { isActive } from "./helper.js";
import UserMedia from "./userMedia.js";
import Hamburger from "./hamburger.js";
import Dropdown from "./dropdown.js";

const body = document.body;

const userMedia = new UserMedia();
userMedia.initiate();

const hamburger = new Hamburger(
	document.querySelector(".js-hamburger-toggle"),
	document.querySelector(".js-hamburger-menu"),
	{
		property: "transform",
		duration: "300ms",
		timing: "ease-in-out",
	}
);

const dropdowns = (() => {
	const container = document.querySelectorAll(".js-dropdown-container");
	const array = [...container].map((element) => {
		return {
			container: element,
			button: element.querySelector(".js-dropdown-button"),
			hover: element.querySelector(".js-dropdown-hover"),
			dropdown: element.querySelector(".js-dropdown"),
			chevron: element.querySelectorAll(".chevron"),
		};
	});
	return array.map((object) => new Dropdown(object));
})();

// if (userMedia.device == "mobile")
// 	hamburger.menu.style.transition = "transform 300ms ease-in-out";

hamburger.button.addEventListener("click", () => {
	hamburger.menu.classList.toggle("active");
	body.classList.toggle("noscroll");
	hamburger.toggle();
});

const resetStyles = () => {
	// reset dropdowns global
	dropdowns.forEach((dropdown) => dropdown.reset());

	if (userMedia.device == "desktop") {
		// reset hamburger menu for desktop
		hamburger.reset();
	} else {
		// reset hamburger menu for mobile
		hamburger.reset();
	}
};

window.addEventListener("resize", () => {
	const deviceBeforeUpdate = userMedia.device;
	// update current media
	userMedia.update();
	// reset styles when breakpoint
	if (deviceBeforeUpdate != userMedia.device) resetStyles();
});

window.addEventListener("click", (event) => {
	// close menu when clicked to overlay
	if (isActive(hamburger.menu) && event.target == hamburger.menu) {
		hamburger.menu.classList.remove("active");
		body.classList.remove("noscroll");
		hamburger.toggle();
	}
});

dropdowns.forEach((element) => {
	if (element.button != undefined) {
		// toggle dropdown when clicked
		element.button.addEventListener("click", () => element.toggle(200));
	}
	if (element.hover != undefined) {
		// open dropdown when hovered
		element.hover.addEventListener("mouseenter", () => {
			if (userMedia.device == "desktop" && !isActive(element.container))
				element.toggle(200);
		});
		// close dropdown when mouse leave
		element.container.addEventListener("mouseleave", () => {
			if (userMedia.device == "desktop" && isActive(element.container))
				element.toggle(200);
		});
		// open dropdown when focused
		element.container.addEventListener("focusin", () => {
			if (
				userMedia.device == "desktop" &&
				!isActive(element.container) &&
				element.container.matches(":focus-within")
			)
				element.toggle(200);
		});
		// close dropdown when focus out
		element.container.addEventListener("focusout", () => {
			if (
				userMedia.device == "desktop" &&
				isActive(element.container) &&
				!element.container.matches(":focus-within")
			)
				element.toggle(200);
		});
	}
});

const initiateSlider = (Slider) => {
	const slider = new Slider(
		document.querySelector(".js-product-image-monitor img"),
		document.querySelectorAll(".js-product-image-slides img")
	);

	slider.slides.forEach((slide) => {
		slide.addEventListener("click", () => slider.slide(slide));
	});
};

const initiateModal = (Modal) => {
	const modal = new Modal(
		document.querySelector(".js-modal"),
		document.querySelector(".js-modal-open"),
		document.querySelector(".js-modal-close"),
		document.querySelector(".js-modal-product")
	);

	modal.product.value = document.querySelector(".js-product-name").innerText;

	modal.open.addEventListener("click", () => modal.toggle());

	modal.close.addEventListener("click", () => modal.toggle());

	window.addEventListener("click", (event) => {
		if (event.target == modal.modal) modal.toggle();
	});
};

if (/(?<=urun).*/.test(window.location.href)) {
	import("./slider").then(({ default: Slider }) => initiateSlider(Slider));
	import("./modal").then(({ default: Modal }) => initiateModal(Modal));
}
