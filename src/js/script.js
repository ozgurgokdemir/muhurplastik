const fontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px', '');

const breakpoints = {
  small: fontSize * 30,
  medium: fontSize * 48,
  large: fontSize * 62,
  xlarge: fontSize * 75
}

let windowWidth = window.innerWidth;

let IsMediaMobile = () => {
  return (windowWidth < breakpoints.large) ? true : false;
}

let currentMedia = IsMediaMobile();

let IsBreakPoint = () => {
  return (currentMedia != IsMediaMobile()) ? true : false;
}

let IsActive = (target) => {
  return target.classList.contains('active') ? true : false;
}

let TargetHeight = (target) => {
  setTimeout(() => {}, 0);
  target.style.height = 'auto';     
  let height = target.clientHeight + 'px';
  target.style.removeProperty('height');
  return height;
}

window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;
  if (IsBreakPoint()) BreakpointResets();
});

function BreakpointResets() {
  currentMedia = IsMediaMobile();
  if (windowWidth >= breakpoints.large) {
    // reset hamburger menu
    hamburgerMenu.classList.remove('active');
    hamburgerMenu.style.removeProperty('transform');
    // reset hamburger button
    btnHamburger.querySelectorAll('span').forEach((bar) => {
      bar.style.removeProperty('transform');
      bar.style.removeProperty('top');
      bar.style.removeProperty('opacity');
    });
    // reset dropdown for desktop
    dropdownDesktopContainer.classList.remove('active');
    dropdownDesktop.style.height = 'auto';     
    dropdownDesktopHeight = dropdownDesktop.clientHeight + 'px';
    dropdownDesktop.style.removeProperty('height');
  } else {
    // reset dropdown for mobile
    dropdownMobileContainer.classList.remove('active');
    dropdownMobile.style.height = 'auto';     
    dropdownMobileHeight = dropdownMobile.clientHeight + 'px';
    dropdownMobile.style.removeProperty('height');
  }
}

window.addEventListener('click', (event) => {
  // close menu when clicked to overlay
  if (IsActive(hamburgerMenu) && event.target == hamburgerMenu) {
    hamburgerMenu.classList.remove('active');
    body.classList.remove('noscroll');
    HamburgerToggle(btnHamburger, 300);
  }
  // close dropdown when clicked outside
  if (IsActive(dropdownMobileContainer) && !dropdownMobileContainer.contains(event.target)) {
    dropdownMobileContainer.classList.remove('active');
    DropdownToggle(dropdownMobile, dropdownMobileHeight, dropdownMobileContainer, 200);
  }
});



/* NAVIGATION MENU */

const btnHamburger = document.getElementById("btnHamburger");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const body = document.body;

// toggle menu when clicked to hamburger button
btnHamburger.addEventListener('click', () => {
  if (!IsActive(hamburgerMenu)) {
    hamburgerMenu.classList.add('active');
    body.classList.add('noscroll');
    HamburgerToggle(btnHamburger, 300);
  } else {
    hamburgerMenu.classList.remove('active');
    body.classList.remove('noscroll');
    HamburgerToggle(btnHamburger, 300);
  }
});

function HamburgerToggle(target, duration=300) {
  bars = target.querySelectorAll('span');
  if (IsActive(hamburgerMenu)) {
    bars[0].style.top = 'calc(50% - ' + 3.6 / fontSize + 'rem / 2)';
    bars[1].style.opacity = '0';
    bars[2].style.top = 'calc(50% - ' + 3.6 / fontSize + 'rem / 2)';
    window.setTimeout(() => {
      if (IsActive(hamburgerMenu)) {
        bars[0].style.transform = 'rotate(-45deg)';
        bars[2].style.transform = 'rotate(45deg)';
      }
    }, duration / 2);
  } else {
    bars[0].style.transform = 'rotate(0deg)';
    bars[2].style.transform = 'rotate(0deg)';
    window.setTimeout(() => {
      if (!IsActive(hamburgerMenu)) {
        bars[0].style.top = '1.25rem';
        bars[1].style.opacity = '1';
        bars[2].style.top = 'calc(100% - ' + 3.6 / fontSize + 'rem - 1.25rem)';
      }
    }, duration / 2);
  }
}



/* DROPDOWN */

const dropdownMobileContainer = document.getElementById("dropdownMobileContainer");
const btnDropdownMobile = dropdownMobileContainer.querySelector("#btnDropdownMobile");
const dropdownMobile = dropdownMobileContainer.querySelector("#dropdownMobile");
let dropdownMobileHeight = TargetHeight(dropdownMobile);

const dropdownDesktopContainer = document.getElementById("dropdownDesktopContainer");
const btnDropdownDesktop = dropdownDesktopContainer.querySelector("#btnDropdownDesktop");
const dropdownDesktop = dropdownDesktopContainer.querySelector("#dropdownDesktop");
let dropdownDesktopHeight = TargetHeight(dropdownDesktop);

// dropdown toggle for mobile

// toggle dropdown when clicked
btnDropdownMobile.addEventListener('click', () => {
  if (!IsActive(dropdownMobileContainer)) {
    dropdownMobileContainer.classList.add('active');
    DropdownToggle(dropdownMobile, dropdownMobileHeight, dropdownMobileContainer, 200);
  } else {
    dropdownMobileContainer.classList.remove('active');
    DropdownToggle(dropdownMobile, dropdownMobileHeight, dropdownMobileContainer, 200);
  }
});

// dropdown toggle for desktop

// open dropdown when hovered
btnDropdownDesktop.addEventListener('mouseenter', () => {
  if (!IsActive(dropdownDesktopContainer)) {
    dropdownDesktopContainer.classList.add('active');
    DropdownToggle(dropdownDesktop, dropdownDesktopHeight, dropdownDesktopContainer, 200);
  }
});

// close dropdown when mouse leave
dropdownDesktopContainer.addEventListener('mouseleave', () => {
  if (IsActive(dropdownDesktopContainer)) {
    dropdownDesktopContainer.classList.remove('active');
    DropdownToggle(dropdownDesktop, dropdownDesktopHeight, dropdownDesktopContainer, 200);
  }
});

// open dropdown when focused
dropdownDesktopContainer.addEventListener('focusin', () => {
  if (!IsActive(dropdownDesktopContainer)) {
    dropdownDesktopContainer.classList.add('active');
    DropdownToggle(dropdownDesktop, dropdownDesktopHeight, dropdownDesktopContainer, 200);
  }
});

// close dropdown when focus out
dropdownDesktopContainer.addEventListener('focusout', () => {
  if (IsActive(dropdownDesktopContainer)) {
    dropdownDesktopContainer.classList.remove('active');
    DropdownToggle(dropdownDesktop, dropdownDesktopHeight, dropdownDesktopContainer, 200);
  }
});

function DropdownToggle(target, targetHeight, container, duration=300) {
  if (IsActive(container)) {
    target.style.visibility = "visible";
    target.style.height = targetHeight;
  } else {
    target.style.height = targetHeight;
    setTimeout(() => {
      target.style.height = '0px';
    }, 0);
    setTimeout( () => {
      if (!IsActive(container)) {
        target.style.visibility = "hidden";
      }
    }, duration);
  }
}



/* CATEGORIES */

const categoryContainer = document.querySelector(".products-page__categories");
const categoryToggle = categoryContainer.querySelector("#categoryToggle");
const category = categoryContainer.querySelector(".products-page__category-list");
let categoryHeight = TargetHeight(category);

const chevron = categoryContainer.querySelector(".chevron");

categoryToggle.addEventListener('click', () => {
  if (!IsActive(categoryContainer)) {
    categoryContainer.classList.add('active');
    chevron.classList.add('active');
    DropdownToggle(category, categoryHeight, categoryContainer, 200)
  } else {
    categoryContainer.classList.remove('active');
    chevron.classList.remove('active');
    DropdownToggle(category, categoryHeight, categoryContainer, 200)
  }
});