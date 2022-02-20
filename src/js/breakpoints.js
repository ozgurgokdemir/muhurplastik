const fontSize = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue('font-size')
  .replace('px', '');

const breakpoints = {
  sm: fontSize * 30, // 480px
  md: fontSize * 48, // 768px
  lg: fontSize * 62, // 992px
  xl: fontSize * 75, // 1200px
  xxl: fontSize * 87.5, // 1400px
};

export default breakpoints;
