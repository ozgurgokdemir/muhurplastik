const fontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px', '');

const breakpoints = {
  small: fontSize * 30,
  medium: fontSize * 48,
  large: fontSize * 62,
  xlarge: fontSize * 75
}

let windowWidth = window.innerWidth;

let isMediaMobile = () => {
  return (windowWidth < breakpoints.large) ? true : false;
}

let currentMedia = isMediaMobile();

let isBreakPoint = () => {
  return (currentMedia != isMediaMobile()) ? true : false;
}

let isActive = (target) => {
  return target.classList.contains('active') ? true : false;
}

window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;
  if (isBreakPoint()) BreakpointResets();
});

function BreakpointResets() {
  currentMedia = isMediaMobile();
  if (windowWidth >= breakpoints.large) {
    // reset hamburger menu
    hamburgerMenu.classList.remove('active');
    hamburgerMenu.style.removeProperty('transform');
    // reset hamburger button
    btnHamburger.querySelectorAll('span').forEach((bar) => {
      bar.style.removeProperty('transform');
      bar.style.removeProperty('opacity');
    });
    // reset dropdown for desktop
    dropdownDesktop.classList.remove('active');
    dropdownDesktop.style.height = 'auto';     
    dropdownDesktopHeight = dropdownDesktop.clientHeight + 'px';
    dropdownDesktop.style.removeProperty('height');
  } else {
    // reset dropdown for mobile
    dropdownMobile.classList.remove('active');
    dropdownMobile.style.height = 'auto';     
    dropdownMobileHeight = dropdownMobile.clientHeight + 'px';
    dropdownMobile.style.removeProperty('height');
  }
}



/* NAVIGATION MENU */

const btnHamburger = document.getElementById("btnHamburger");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const body = document.body;

// toggle menu when clicked to hamburger button
btnHamburger.addEventListener('click', () => {
  if (!isActive(hamburgerMenu)) {
    hamburgerMenu.classList.add('active');
    body.classList.add('noscroll');
    HamburgerToggle(btnHamburger, 300);
  } else {
    hamburgerMenu.classList.remove('active');
    body.classList.remove('noscroll');
    HamburgerToggle(btnHamburger, 300);
  }
});

// close menu when clicked to overlay
window.addEventListener('click', (event) => {
  if (event.target == hamburgerMenu) {
    hamburgerMenu.classList.remove('active');
    body.classList.remove('noscroll');
    HamburgerToggle(btnHamburger, 300);
  }
});

let lastMenuToggle = [];
function HamburgerToggle(target, duration=300) {
  bars = target.querySelectorAll('span');
  if (isActive(hamburgerMenu)) {
    let transitionNumber = lastMenuToggle.length;
    lastMenuToggle.push(transitionNumber);
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.transitionProperty = "transform, opacity";
      bars[i].style.transitionDuration = duration / 2 + 'ms';
      bars[i].style.transitionTimingFunction = 'ease-in-out';
      window.setTimeout( () => {
        if (isActive(hamburgerMenu) && lastMenuToggle[lastMenuToggle.length - 1] == transitionNumber) {
          bars[i].style.removeProperty('transition');
        }
      }, duration);
    }
    bars[0].style.transform = 'translateY(300%) rotate(0deg)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'translateY(-300%) rotate(0deg)';
    window.setTimeout(() => {
      if (isActive(hamburgerMenu)) {
        bars[0].style.transform = 'translateY(300%) rotate(-45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-300%) rotate(45deg)';
      }
    }, duration / 2);
  } else {
    let transitionNumber = lastMenuToggle.length;
    lastMenuToggle.push(transitionNumber);
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.transitionProperty = "transform, opacity";
      bars[i].style.transitionDuration = duration / 2 + 'ms';
      bars[i].style.transitionTimingFunction = 'ease-in-out';
      window.setTimeout( () => {
        if (!isActive(hamburgerMenu) && lastMenuToggle[lastMenuToggle.length - 1] == transitionNumber) {
          bars[i].style.removeProperty('transition');
        }
      }, duration);
    }
    bars[0].style.transform = 'translateY(300%) rotate(0deg)';
    bars[2].style.transform = 'translateY(-300%) rotate(0deg)';
    window.setTimeout(() => {
      bars[0].style.transform = 'translateY(0%) rotate(0deg)';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'translateY(0%) rotate(0deg)';
    }, duration / 2);
  }
}



/* DROPDOWN */

const dropdownDesktopContainer = document.getElementById("dropdownDesktopContainer");
const btnDropdownMobile = document.getElementById("btnDropdownMobile");
const btnDropdownDesktop = document.getElementById("btnDropdownDesktop");
const dropdownMobile = document.getElementById("dropdownMobile");
const dropdownDesktop = document.getElementById("dropdownDesktop");

// dropdown toggle for mobile
dropdownMobile.style.height = 'auto';     
let dropdownMobileHeight = dropdownMobile.clientHeight + 'px';
dropdownMobile.style.removeProperty('height');
btnDropdownMobile.addEventListener('click', () => {
  if (!isActive(dropdownMobile)) {
    dropdownMobile.classList.add('active');

    let transitionNumber = lastDropdownToggle.length;
    lastDropdownToggle.push(transitionNumber);

    dropdownMobile.style.transition = 'height ' + (200 + 'ms') + ' ease-in-out';

    setTimeout( () => {
      dropdownMobile.style.visibility = "visible";
      dropdownMobile.style.height = dropdownMobileHeight;
    }, 0);
    setTimeout(() => {
      if (isActive(dropdownMobile) && lastDropdownToggle[lastDropdownToggle.length - 1] == transitionNumber) {
        dropdownMobile.style.removeProperty('transition');
      }
    }, 200);
  } else {
    dropdownMobile.classList.remove('active');
    DropdownToggle(dropdownMobile, 200);
  }
});

// dropdown toggle for desktop
dropdownDesktop.style.height = 'auto';   
let dropdownDesktopHeight = dropdownDesktop.offsetHeight + 'px';
dropdownDesktop.style.removeProperty('height'); 

// open dropdown when hovered
btnDropdownDesktop.addEventListener('mouseenter', () => {
  if (!isActive(dropdownDesktop)) {
    dropdownDesktop.classList.add('active');
    DropdownToggle(dropdownDesktop, 200);
  }
});

// close dropdown when mouse leave
dropdownDesktopContainer.addEventListener('mouseleave', () => {
  if (isActive(dropdownDesktop)) {
    dropdownDesktop.classList.remove('active');
    DropdownToggle(dropdownDesktop, 200);
  }
});

// open dropdown when focused
dropdownDesktopContainer.addEventListener('focusin', () => {
  if (!isActive(dropdownDesktop)) {
    dropdownDesktop.classList.add('active');
    DropdownToggle(dropdownDesktop, 200);
  }
});

// close dropdown when focus out
dropdownDesktopContainer.addEventListener('focusout', () => {
  if (isActive(dropdownDesktop)) {
    dropdownDesktop.classList.remove('active');
    DropdownToggle(dropdownDesktop, 200);
  }
});

let lastDropdownToggle = []; 
function DropdownToggle(target, duration=300) {
  if (isActive(target)) {
    let transitionNumber = lastDropdownToggle.length;
    lastDropdownToggle.push(transitionNumber);
    setTimeout(() => {
      target.style.transition = 'height ' + (duration + 'ms') + ' ease-in-out';
    }, 0);
    setTimeout( () => {
      target.style.visibility = "visible";
      target.style.height = dropdownDesktopHeight;
    }, 0);
    setTimeout(() => {
      if (isActive(target) && lastDropdownToggle[lastDropdownToggle.length - 1] == transitionNumber) {
        target.style.removeProperty('transition');
      }
    }, duration);
  } else {
    let transitionNumber = lastDropdownToggle.length;
    lastDropdownToggle.push(transitionNumber);
    target.style.transition = 'height ' + (duration + 'ms') + ' ease-in-out';
    target.style.height = '0px';
    setTimeout( () => {
      if (!isActive(target) && lastDropdownToggle[lastDropdownToggle.length - 1] == transitionNumber) {
        target.style.removeProperty('transition');
        target.style.removeProperty('height');
        target.style.visibility = "hidden";
      }
    }, duration);
  }
}