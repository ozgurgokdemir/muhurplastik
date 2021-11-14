const fontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px', '');

const breakpoints = {
  small: fontSize * 30,
  medium: fontSize * 48,
  large: fontSize * 62,
  xlarge: fontSize * 75
}

const body = document.body;

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
    hamburgerMenu.style.removeProperty('transition');
    // reset hamburger button
    hamburgerToggle.querySelectorAll('span').forEach((bar) => {
      bar.style.removeProperty('transform');
      bar.style.removeProperty('top');
      bar.style.removeProperty('opacity');
    });
    // reset dropdown for desktop
    for (let i = 0; i < dropdownContainer.length; i++) {
      if (dropdownContainer[i] == navDropdownContainer) {
        dropdownContainer[i].classList.remove('active');
        chevron[i].classList.add('active');
        dropdown[i].style.height = 'auto';     
        dropdownHeight[i] = dropdown[i].clientHeight + 'px';
        dropdown[i].style.removeProperty('height');
      }
    }
    // reset dropdown link for desktop
    navDropdownToggle.setAttribute('href', dropdownToggleLink)
  } else {
    hamburgerMenu.style.removeProperty('transition');
    setTimeout(() => {
      hamburgerMenu.style.transition = 'transform 300ms ease-in-out';
    }, 300);
    // reset dropdown for mobile
    for (let i = 0; i < dropdownContainer.length; i++) {
      if (dropdownContainer[i] == navDropdownContainer) {
        dropdownContainer[i].classList.remove('active');
        chevron[i].classList.add('active');
        dropdown[i].style.height = 'auto';     
        dropdownHeight[i] = dropdown[i].clientHeight + 'px';
        dropdown[i].style.removeProperty('height');
      }
    }
    // remove dropdown link for mobile
    navDropdownToggle.removeAttribute('href');
  }
}

window.addEventListener('click', (event) => {
  // close menu when clicked to overlay
  if (IsActive(hamburgerMenu) && event.target == hamburgerMenu) {
    hamburgerMenu.classList.remove('active');
    body.classList.remove('noscroll');
    HamburgerToggle(hamburgerToggle, 300);
  }
  // close dropdown when clicked outside
  if (IsMediaMobile() && IsActive(navDropdownContainer) && !navDropdownContainer.contains(event.target)) {
    for (let i = 0; i < dropdownContainer.length; i++) {
      if (dropdownContainer[i] == navDropdownContainer) {
        DropdownToggle(dropdown[i], dropdownHeight[i], dropdownContainer[i], chevron[i], 200); 
      }
    }
  }
});



/* NAVIGATION MENU */

const hamburgerToggle = document.querySelector(".js-hamburger-toggle");
const hamburgerMenu = document.querySelector(".js-hamburger-menu");

const navDropdownContainer = document.querySelector(".nav__item.js-dropdown-container");
const navDropdownToggle = navDropdownContainer.querySelector(".nav__link.js-dropdown-toggle");

let dropdownToggleLink = navDropdownToggle.getAttribute('href');

if (IsMediaMobile()) {
  hamburgerMenu.style.transition = 'transform 300ms ease-in-out';
  navDropdownToggle.removeAttribute('href');
}

// toggle menu when clicked to hamburger button
hamburgerToggle.addEventListener('click', () => {
  if (!IsActive(hamburgerMenu)) {
    hamburgerMenu.classList.add('active');
    body.classList.add('noscroll');
    HamburgerToggle(hamburgerToggle, 300);
  } else {
    hamburgerMenu.classList.remove('active');
    body.classList.remove('noscroll');
    HamburgerToggle(hamburgerToggle, 300);
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

const dropdownContainer = document.querySelectorAll(".js-dropdown-container");
const dropdownToggle = [];
const dropdown = [];
let dropdownHeight = [];
const chevron = [];

dropdownContainer.forEach(element => {
  dropdownToggle.push(element.querySelector(".js-dropdown-toggle"));
  dropdown.push(element.querySelector(".js-dropdown"));
  chevron.push(element.querySelector(".chevron"));
  dropdownHeight.push(TargetHeight(element.querySelector(".js-dropdown")));
});

for (let i = 0; i < dropdownContainer.length; i++) {
  // MOBILE & DESKTOP //
  // toggle dropdown when clicked
  dropdownToggle[i].addEventListener('click', () => {
    if (!IsMediaMobile() && dropdownContainer[i] == navDropdownContainer) return;
    if (!IsActive(dropdownContainer[i])) {
      DropdownToggle(dropdown[i], dropdownHeight[i], dropdownContainer[i], chevron[i], 200);
    } else {
      DropdownToggle(dropdown[i], dropdownHeight[i], dropdownContainer[i], chevron[i], 200);
    }
  })
  // DESKTOP //
  if (dropdownContainer[i] == navDropdownContainer) {
    // open dropdown when hovered
    dropdownToggle[i].addEventListener('mouseenter', () => {
      if (!IsMediaMobile() && !IsActive(dropdownContainer[i])) {
        DropdownToggle(dropdown[i], dropdownHeight[i], dropdownContainer[i], chevron[i], 200);
      }
    });
    // close dropdown when mouse leave
    dropdownContainer[i].addEventListener('mouseleave', () => {
      if (!IsMediaMobile() && IsActive(dropdownContainer[i])) {
        DropdownToggle(dropdown[i], dropdownHeight[i], dropdownContainer[i], chevron[i], 200);
      }
    });
    // open dropdown when focused
    dropdownContainer[i].addEventListener('focusin', () => {
      if (!IsMediaMobile() && !IsActive(dropdownContainer[i]) && dropdownContainer[i].matches(':focus-within')) {
        DropdownToggle(dropdown[i], dropdownHeight[i], dropdownContainer[i], chevron[i], 200);
      }
    });
    // close dropdown when focus out
    dropdownContainer[i].addEventListener('focusout', (event) => {
      if (!IsMediaMobile() && IsActive(dropdownContainer[i]) && !dropdownContainer[i].matches(':focus-within')) {
        DropdownToggle(dropdown[i], dropdownHeight[i], dropdownContainer[i], chevron[i], 200);
      }
    });
  }
}

function DropdownToggle(target, targetHeight, container, chevron, duration=300) {
  container.classList.toggle('active')
  chevron.classList.toggle('active');
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