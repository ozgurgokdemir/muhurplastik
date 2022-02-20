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
  constructor() {
    this.width = window.innerWidth;
    this.media = this.getMedia();
    this.device = this.getDevice();
  }

  update() {
    this.width = window.innerWidth;
    this.media = this.getMedia();
    this.device = this.getDevice();
  }

  getMedia() {
    if (this.width < breakpoints.sm) return MEDIA_ENUMS.XS;
    if (this.width < breakpoints.md) return MEDIA_ENUMS.SM;
    if (this.width < breakpoints.lg) return MEDIA_ENUMS.MD;
    if (this.width < breakpoints.xl) return MEDIA_ENUMS.LG;
    if (this.width < breakpoints.xxl) return MEDIA_ENUMS.XL;
    return MEDIA_ENUMS.XXL;
  }

  getDevice() {
    switch (this.media) {
      case MEDIA_ENUMS.XXL:
      case MEDIA_ENUMS.XL:
      case MEDIA_ENUMS.LG:
        return DEVICE_ENUMS.DESKTOP;
      default:
        return DEVICE_ENUMS.MOBILE;
    }
  }
}
