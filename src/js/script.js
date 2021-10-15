const fontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px', '');

const breakpoints = {
  medium: fontSize * 48,
  large: fontSize * 62,
  xlarge: fontSize * 75
}

let windowWidth = window.innerWidth;

let isMediaMobile = () => {
  return (windowWidth < breakpoints.medium) ? true : false;
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
  BreakpointResets();
});

function BreakpointResets() {
  if (isBreakPoint()) {
    currentMedia = isMediaMobile();
    if (windowWidth >= breakpoints.medium) {
      // reset hamburger menu
      hamburgerMenu.classList.remove('active');
      hamburgerMenu.style.removeProperty('transform');
      // reset dropdown
      dropdownContainer.classList.remove('active');
      navDropdown.style.height = 'auto';     
      dropdownHeight = navDropdown.clientHeight + 'px';
      navDropdown.style.removeProperty('height');
      // reset dropdown content for desktop
      dropdownContent.style.height = 'auto';     
      dropdownContentHeight = dropdownContent.clientHeight + 'px';
      dropdownContentPadding = {
        top: window.getComputedStyle(dropdownContent).getPropertyValue('padding-top'),
        bottom: window.getComputedStyle(dropdownContent).getPropertyValue('padding-bottom')
      }
      dropdownContent.style.removeProperty('height');
      // reset hamburger button
      btnHamburger.querySelectorAll('span').forEach((bar) => {
        bar.style.removeProperty('transform');
        bar.style.removeProperty('opacity');
      });
    } else {
      // reset dropdown for mobile
      navDropdown.style.height = 'auto';     
      dropdownHeight = navDropdown.clientHeight + 'px';
      navDropdown.style.removeProperty('height');
      // reset dropdown content for mobile
      dropdownContent.style.height = 'auto';     
      dropdownContentHeight = dropdownContent.clientHeight + 'px';
      dropdownContentPadding = {
        top: window.getComputedStyle(dropdownContent).getPropertyValue('padding-top'),
        bottom: window.getComputedStyle(dropdownContent).getPropertyValue('padding-bottom')
      }
      dropdownContent.style.removeProperty('height');
    }
  }
}



/* NAVIGATION MENU */

const btnHamburger = document.getElementById("btnHamburger");
const hamburgerMenu = document.getElementById("hamburgerMenu");

btnHamburger.addEventListener('click', () => {
  if (windowWidth < breakpoints.medium) {
    if (!isActive(hamburgerMenu)) {
      hamburgerMenu.classList.add('active');
      MenuToggle(hamburgerMenu, 300);
      HamburgerToggle(btnHamburger, 300);
    } else {
      hamburgerMenu.classList.remove('active');
      MenuToggle(hamburgerMenu, 300);
      HamburgerToggle(btnHamburger, 300);
    }
  }
});

window.addEventListener('click', (event) => {
  if (windowWidth < breakpoints.medium) {
    if (event.target == hamburgerMenu) {
      hamburgerMenu.classList.remove('active');
      MenuToggle(hamburgerMenu, 300);
      HamburgerToggle(btnHamburger, 300);
    }
  }
});

let lastMenuToggle = [];
function MenuToggle(target, duration=300) {
  if (isActive(hamburgerMenu)) {
    let transitionNumber = lastMenuToggle.length;
    lastMenuToggle.push(transitionNumber);
    target.style.transitionProperty = "transform";
    target.style.transitionDuration = duration + 'ms';
    target.style.transitionTimingFunction = 'ease-in-out';
    target.style.transform = 'translateX(0)';
    window.setTimeout( () => {
      if (isActive(hamburgerMenu) && lastMenuToggle[lastMenuToggle.length - 1] == transitionNumber) {
        target.style.removeProperty('transition');
      }
    }, duration);
  } else {
    let transitionNumber = lastMenuToggle.length;
    lastMenuToggle.push(transitionNumber);
    target.style.transitionProperty = "transform";
    target.style.transitionDuration = duration + 'ms';
    target.style.transitionTimingFunction = 'ease-in-out';
    target.style.transform = 'translateX(-100%)';
    window.setTimeout( () => {
      if (!isActive(hamburgerMenu) && lastMenuToggle[lastMenuToggle.length - 1] == transitionNumber) {
        target.style.removeProperty('transition');
        target.style.removeProperty('transform');
      }
    }, duration);
  }
}

function HamburgerToggle(target, duration=300) {
  bars = target.querySelectorAll('span');
  if (isActive(hamburgerMenu)) {
    let transitionNumber = lastMenuToggle.length - 1;
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
        bars[2].style.transform = 'translateY(-300%) rotate(45deg)';
      }
    }, duration / 2);
  } else {
    let transitionNumber = lastMenuToggle.length - 1;
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

const dropdownContainer = document.querySelector('.nav__item--dropdown');
const btnDropdown = document.getElementById("btnDropdown");
const navDropdown = document.getElementById("navDropdown");
const dropdownContent = document.querySelector('.dropdown__content');

// dropdown toggle for mobile
navDropdown.style.height = 'auto';     
let dropdownHeight = navDropdown.clientHeight + 'px';
navDropdown.style.removeProperty('height');
btnDropdown.addEventListener('click', () => {
  if (windowWidth < breakpoints.medium) {
    if (!isActive(dropdownContainer)) {
      dropdownContainer.classList.add('active');

      let transitionNumber = lastDropdownToggle.length;
      lastDropdownToggle.push(transitionNumber);

      navDropdown.style.transition = 'height ' + (200 + 'ms') + ' ease-in-out';
  
      setTimeout( () => {
        navDropdown.style.height = dropdownHeight;
      }, 0);
      setTimeout(() => {
        if (isActive(dropdownContainer) && lastDropdownToggle[lastDropdownToggle.length - 1] == transitionNumber) {
          navDropdown.style.removeProperty('transition');
        }
      }, 200);
    } else {
      dropdownContainer.classList.remove('active');
      DropdownToggle(navDropdown, 200);
    }
  }
});

// dropdown toggle for desktop
btnDropdown.addEventListener('mouseenter', () => {
  if (windowWidth >= breakpoints.medium) {
    if (!isActive(dropdownContainer)) {
      dropdownContainer.classList.add('active');
      DropdownToggle(navDropdown, 200);
      DropdownContentToggle(dropdownContent, 200);
    }
  }
});

dropdownContainer.addEventListener('mouseleave', () => {
  if (windowWidth >= breakpoints.medium) {
    if (isActive(dropdownContainer)) {
      dropdownContainer.classList.remove('active');
      DropdownToggle(navDropdown, 200);
      DropdownContentToggle(dropdownContent, 200);
    }
  }
});

window.addEventListener('mouseover', (event) => {
  if (windowWidth >= breakpoints.medium) {
    if (isActive(dropdownContainer) && event.target == navDropdown) {
      dropdownContainer.classList.remove('active');
      DropdownToggle(navDropdown, 200);
      DropdownContentToggle(dropdownContent, 200);
    }
  }
});

let lastDropdownToggle = [];
function DropdownToggle(target, duration=300) {
  if (isActive(dropdownContainer) && windowWidth >= breakpoints.medium) {
    let transitionNumber = lastDropdownToggle.length;
    lastDropdownToggle.push(transitionNumber);
    target.style.transition = 'height ' + (duration + 'ms') + ' ease-in-out';
    setTimeout( () => {
      target.style.height = '100%';
    }, 0);
    setTimeout(() => {
      if (isActive(dropdownContainer) && lastDropdownToggle[lastDropdownToggle.length - 1] == transitionNumber) {
        target.style.removeProperty('transition');
      }
    }, duration);
  } else {
    let transitionNumber = lastDropdownToggle.length;
    lastDropdownToggle.push(transitionNumber);
    target.style.transition = 'height ' + (duration + 'ms') + ' ease-in-out';
    target.style.height = '0px';
    setTimeout( () => {
      if (!isActive(dropdownContainer) && lastDropdownToggle[lastDropdownToggle.length - 1] == transitionNumber) {
        target.style.removeProperty('transition');
        target.style.removeProperty('height');
      }
    }, duration);
  }
}

dropdownContent.style.height = 'auto';     
let dropdownContentHeight = dropdownContent.clientHeight + 'px';
let dropdownContentPadding = {
  top: window.getComputedStyle(dropdownContent).getPropertyValue('padding-top'),
  bottom: window.getComputedStyle(dropdownContent).getPropertyValue('padding-bottom')
}
dropdownContent.style.removeProperty('height');
function DropdownContentToggle(target, duration=300) {
  if (isActive(dropdownContainer)) {
    let transitionNumber = lastDropdownToggle.length - 1;
    target.style.height = '0px';
    target.style.paddingTop = '0px';
    target.style.paddingBottom = '0px';
    setTimeout(() => {
      target.style.transitionProperty = 'height, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.transitionTimingFunction = 'ease-in-out';
    }, 0);
    setTimeout( () => {
      target.style.height = dropdownContentHeight;
      target.style.paddingTop = dropdownContentPadding.top;
      target.style.paddingBottom = dropdownContentPadding.bottom;
    }, 0);
    setTimeout(() => {
      if (isActive(dropdownContainer) && lastDropdownToggle[lastDropdownToggle.length - 1] == transitionNumber) {
        target.style.removeProperty('transition');
      }
    }, duration);
  } else {
    let transitionNumber = lastDropdownToggle.length - 1;
    target.style.transitionProperty = 'height, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.transitionTimingFunction = 'ease-in-out';
    target.style.height = '0px';
    target.style.paddingTop = '0px';
    target.style.paddingBottom = '0px';
    setTimeout( () => {
      if (!isActive(dropdownContainer) && lastDropdownToggle[lastDropdownToggle.length - 1] == transitionNumber) {
        target.style.removeProperty('transition');
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
      }
    }, duration);
  }
}