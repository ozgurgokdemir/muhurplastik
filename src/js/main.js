import { isActive, targetHeight } from "./helper.js";
import UserMedia from "./userMedia.js";
import Hamburger from "./hamburger.js";
import Dropdown from "./dropdown.js";
// import Slider from "./slider.js";
// import Modal from "./modal.js";

const body = document.body;

let userMedia = new UserMedia();
userMedia.initiate();

const hamburger = new Hamburger(
	document.querySelector(".js-hamburger-toggle"),
	document.querySelector(".js-hamburger-menu")
);

const dropdowns = [];
document.querySelectorAll(".js-dropdown-container").forEach((element) => {
	dropdowns.push(
		new Dropdown(
			element,
			element.querySelector(".js-dropdown-button"),
			element.querySelector(".js-dropdown-hover"),
			element.querySelector(".js-dropdown"),
			targetHeight(element.querySelector(".js-dropdown")),
			element.querySelectorAll(".chevron")
		)
	);
});

if (userMedia.device == "mobile")
	hamburger.menu.style.transition = "transform 300ms ease-in-out";

hamburger.button.addEventListener("click", () => {
	hamburger.menu.classList.toggle("active");
	body.classList.toggle("noscroll");
	hamburger.toggle(300);
});

let resetStyles = () => {
	// reset dropdown for desktop
	dropdowns.forEach((element) => {
		element.container.classList.remove("active");
		element.button?.classList.remove("active");
		element.hover?.classList.remove("active");
		element.chevron.forEach((element) => element?.classList.add("active"));
		element.height = targetHeight(element.dropdown);
	});
	if (userMedia.device == "desktop") {
		// reset hamburger menu
		hamburger.menu.classList.remove("active");
		hamburger.menu.style.removeProperty("transform");
		hamburger.menu.style.removeProperty("transition");
		// reset hamburger button
		hamburger.button.querySelectorAll("span").forEach((bar) => {
			bar.style.removeProperty("transform");
			bar.style.removeProperty("top");
			bar.style.removeProperty("opacity");
		});
	} else {
		hamburger.menu.style.removeProperty("transition");
		setTimeout(() => {
			hamburger.menu.style.transition = "transform 300ms ease-in-out";
		}, 300);
	}
	console.log("Styles are Reset");
};

window.addEventListener("resize", () => {
	let deviceBeforeUpdate = userMedia.device;
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
		hamburger.toggle(300);
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
	let slider = new Slider(
		document.querySelector(".js-product-image-monitor img"),
		document.querySelectorAll(".js-product-image-slides img")
	);

	slider.slides.forEach((slide) => {
		slide.addEventListener("click", () => slider.slide(slide));
	});
};

const initiateModal = (Modal) => {
	let modal = new Modal(
		document.querySelector(".js-modal"),
		document.querySelector(".js-modal-open"),
		document.querySelector(".js-modal-close"),
		document.querySelector(".js-modal-product")
	);

	modal.product.value = document.querySelector(".js-product-name")?.innerText;

	modal.open.addEventListener("click", () => modal.toggle());

	modal.close.addEventListener("click", () => modal.toggle());

	window.addEventListener("click", (event) => {
		if (event.target == modal.modal) modal.toggle();
	});
};

if (/urun\/*/.test(window.location.href)) {
	import("./slider").then(({ default: Slider }) => initiateSlider(Slider));

	import("./modal").then(({ default: Modal }) => initiateModal(Modal));
}
