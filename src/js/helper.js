export const isActive = (target) => target.classList.contains('active');

export const targetHeight = (target) => {
  setTimeout(() => {}, 0);
  target.style.height = 'auto';
  const height = `${target.clientHeight}px`;
  target.style.removeProperty('height');
  return height;
};
