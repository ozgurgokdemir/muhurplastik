import breakpoints from './breakpoints';

const MEDIA_ENUMS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: 'xxl',
};
const DEVICE_ENUMS = {
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
};

export default class UserMedia {
  static {
    this.width = window.innerWidth;
    this.media = this.getMedia();
    this.device = this.getDevice();
    this.fontSize = this.getFontSize();
    this.MEDIA_ENUMS = MEDIA_ENUMS;
    this.DEVICE_ENUMS = DEVICE_ENUMS;
  }

  static update() {
    this.width = window.innerWidth;
    this.media = this.getMedia();
    this.device = this.getDevice();
    this.fontSize = this.getFontSize();
  }

  static getMedia() {
    if (this.width < breakpoints.getSM(this.fontSize)) return MEDIA_ENUMS.XS;
    if (this.width < breakpoints.getMD(this.fontSize)) return MEDIA_ENUMS.SM;
    if (this.width < breakpoints.getLG(this.fontSize)) return MEDIA_ENUMS.MD;
    if (this.width < breakpoints.getXL(this.fontSize)) return MEDIA_ENUMS.LG;
    if (this.width < breakpoints.getXXL(this.fontSize)) return MEDIA_ENUMS.XL;
    return MEDIA_ENUMS.XXL;
  }

  static getDevice() {
    switch (this.media) {
      case MEDIA_ENUMS.XXL:
      case MEDIA_ENUMS.XL:
      case MEDIA_ENUMS.LG:
        return DEVICE_ENUMS.DESKTOP;
      default:
        return DEVICE_ENUMS.MOBILE;
    }
  }

  static getFontSize() {
    return window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size')
      .replace('px', '');
  }
}
