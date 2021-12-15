export default class UserMedia {
	constructor() {
		this.fontSize;
		this.breakpoints;
		this.width;
		this.previous;
		this.current;
		this.device;
	}
	initiate() {
		this.fontSize = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue("font-size")
			.replace("px", "");

		this.breakpoints = {
			small: this.fontSize * 30,
			medium: this.fontSize * 48,
			large: this.fontSize * 62,
			xlarge: this.fontSize * 75,
		};

		this.width = window.innerWidth;

		this.current = this.getMedia();

		this.device = this.getDevice();

		this.log("Initiated");
	}
	update() {
		let previousMedia = this.current;

		this.width = window.innerWidth;

		let media = this.getMedia();

		if (this.current != media) {
			this.previous = this.current;
			this.current = media;
		}

		this.device = this.getDevice();

		if (previousMedia != media) this.log("Updated");
	}
	getMedia() {
		if (this.width < this.breakpoints.small) {
			return "xsmall";
		} else if (this.width < this.breakpoints.medium) {
			return "small";
		} else if (this.width < this.breakpoints.large) {
			return "medium";
		} else if (this.width < this.breakpoints.xlarge) {
			return "large";
		} else {
			return "xlarge";
		}
	}
	getDevice() {
		switch (this.current) {
			case "large":
			case "xlarge":
				return "desktop";
			default:
				return "mobile";
		}
	}
	log(operation) {
		console.log(`Media is ${operation}`);
		console.log("-> font size: " + this.fontSize);
		console.log("-> breakpoints: " + this.breakpoints);
		console.log("-> width: " + this.width);
		console.log("-> previous: " + this.previous);
		console.log("-> current: " + this.current);
		console.log("-> device: " + this.device);
	}
}
