export default class UserMedia {
  constructor() {
    this.fontSize = undefined;
    this.breakpoints = undefined;
    this.width = undefined;
    this.previous = undefined;
    this.current = undefined;
    this.device = undefined;
  }

  initiate() {
    this.fontSize = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size')
      .replace('px', '');

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

    const media = this.getMedia();

    if (this.current !== media) {
      this.previous = this.current;
      this.current = media;
    }

    this.device = this.getDevice();
  }

  getMedia() {
    if (this.width < this.breakpoints.small) {
      return 'xsmall';
    }
    if (this.width < this.breakpoints.medium) {
      return 'small';
    }
    if (this.width < this.breakpoints.large) {
      return 'medium';
    }
    if (this.width < this.breakpoints.xlarge) {
      return 'large';
    }
    return 'xlarge';
  }

  getDevice() {
    switch (this.current) {
      case 'large':
      case 'xlarge':
        return 'desktop';
      default:
        return 'mobile';
    }
  }
}
