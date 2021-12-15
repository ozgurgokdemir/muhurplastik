export default class Slider {
	constructor(monitor, slides) {
		this.monitor = monitor;
		this.slides = slides;
	}
	slide(slide) {
		this.slides.forEach((element) => {
			element.classList.remove("active");
		});

		const slideAttr = slide.getAttribute("src");

		this.monitor.setAttribute("src", slideAttr);
		slide.classList.toggle("active");
	}
}
