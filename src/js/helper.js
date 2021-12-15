export let isActive = (target) =>
	target.classList.contains("active") ? true : false;

export let targetHeight = (target) => {
	setTimeout(() => {}, 0);
	target.style.height = "auto";
	let height = target.clientHeight + "px";
	target.style.removeProperty("height");
	return height;
};
