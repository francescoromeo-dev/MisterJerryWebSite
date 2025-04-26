// Button menu small size
let menu = document.querySelector('#menu-icon');
let navigationCenter = document.querySelector('.navigation-center');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navigationCenter.classList.toggle('open')
}

//Dynamic height size fix
function setHeroHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  window.addEventListener('resize', setHeroHeight);
  window.addEventListener('load', setHeroHeight);