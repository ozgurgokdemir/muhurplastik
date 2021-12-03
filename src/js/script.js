//#region => HELPER 
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
//#endregion

//#region => CLASSES 
class Dropdown {
  constructor(container, button, hover, dropdown, height, chevron) {
    this.container = container;
    this.button = button;
    this.hover = hover;
    this.dropdown = dropdown;
    this.height = height;
    this.chevron = chevron;
  }
  toggle(duration = 200) {
    this.container.classList.toggle('active');
    this.button?.classList.toggle('active');
    this.hover?.classList.toggle('active');
    this.chevron?.forEach(element => element.classList.toggle('active'));
    if (IsActive(this.container)) {
      this.dropdown.style.visibility = "visible";
      this.dropdown.style.height = this.height;
    } else {
      this.dropdown.style.height = this.height;
      setTimeout(() => {
        this.dropdown.style.height = '0px';
      }, 0);
      setTimeout( () => {
        if (!IsActive(this.container)) {
          this.dropdown.style.visibility = "hidden";
        }
      }, duration);
    }
  }
}
//#endregion

//#region => PROPERTIES 
const hamburgerButton = document.querySelector(".js-hamburger-toggle");
const hamburgerMenu = document.querySelector(".js-hamburger-menu");

const dropdowns = [];
document.querySelectorAll(".js-dropdown-container").forEach(element => {
  dropdowns.push(new Dropdown(
    element,
    element.querySelector(".js-dropdown-button"),
    element.querySelector(".js-dropdown-hover"),
    element.querySelector(".js-dropdown"),
    TargetHeight(element.querySelector(".js-dropdown")),
    element.querySelectorAll(".chevron")
  ))
});
//#endregion

//#region => FUNCTIONS 
let HamburgerToggle = (target, duration=300) => {
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
//#endregion

//#region => GLOBAL 
let ResetStyles = () => {
  // update current media
  currentMedia = IsMediaMobile();
  // reset dropdown for desktop
  dropdowns.forEach(element => {
    element.container.classList.remove('active');
    element.button?.classList.remove('active');
    element.hover?.classList.remove('active');
    element.chevron.forEach(element => element?.classList.add('active'));
    element.height = TargetHeight(element.dropdown);
  })
  if (windowWidth >= breakpoints.large) {
    // reset hamburger menu
    hamburgerMenu.classList.remove('active');
    hamburgerMenu.style.removeProperty('transform');
    hamburgerMenu.style.removeProperty('transition');
    // reset hamburger button
    hamburgerButton.querySelectorAll('span').forEach((bar) => {
      bar.style.removeProperty('transform');
      bar.style.removeProperty('top');
      bar.style.removeProperty('opacity');
    });
  } else {
    hamburgerMenu.style.removeProperty('transition');
    setTimeout(() => {
      hamburgerMenu.style.transition = 'transform 300ms ease-in-out';
    }, 300);
  }
}

window.addEventListener('resize', () => {
  // update current page width
  windowWidth = window.innerWidth;
  // reset styles when breakpoint
  if (IsBreakPoint()) ResetStyles();
});

window.addEventListener('click', (event) => {
  // close menu when clicked to overlay
  if (IsActive(hamburgerMenu) && event.target == hamburgerMenu) {
    hamburgerMenu.classList.remove('active');
    body.classList.remove('noscroll');
    HamburgerToggle(hamburgerButton, 300);
  }
  /* close dropdown when clicked outside => !navDropdownContainer.contains(event.target) */
});
//#endregion

//#region => NAVIGATION MENU 
if (IsMediaMobile) hamburgerMenu.style.transition = 'transform 300ms ease-in-out';

// toggle menu when clicked to hamburger button
hamburgerButton.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  body.classList.toggle('noscroll');
  HamburgerToggle(hamburgerButton, 300);
});
//#endregion

//#region => DROPDOWN 
dropdowns.forEach(element => {
  if (element.button != undefined) {
    // toggle dropdown when clicked
    element.button.addEventListener("click", () => element.toggle(200))
  }
  if (element.hover != undefined) {
    // open dropdown when hovered
    element.hover.addEventListener('mouseenter', () => {
      if (!IsMediaMobile() && !IsActive(element.container)) element.toggle(200);
    });
    // close dropdown when mouse leave
    element.container.addEventListener('mouseleave', () => {
      if (!IsMediaMobile() && IsActive(element.container)) element.toggle(200);
    });
    // open dropdown when focused
    element.container.addEventListener('focusin', () => {
      if (!IsMediaMobile() && !IsActive(element.container) 
      && element.container.matches(':focus-within')) element.toggle(200);
    });
    // close dropdown when focus out
    element.container.addEventListener('focusout', () => {
      if (!IsMediaMobile() && IsActive(element.container) 
      && !element.container.matches(':focus-within')) element.toggle(200);
    });
  }
})
//#endregion