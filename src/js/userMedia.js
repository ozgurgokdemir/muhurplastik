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
	}
	update() {
		this.width = window.innerWidth;

		let media = this.getMedia();

		if (this.current != media) {
			this.previous = this.current;
			this.current = media;
		}

		this.device = this.getDevice();
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
}
