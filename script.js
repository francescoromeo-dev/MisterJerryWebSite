// Button menu small size
let menu = document.querySelector('#menu-icon');
let navigationCenter = document.querySelector('.navigation-center');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navigationCenter.classList.toggle('open')
}

//Dynamic height size fix
function setHeroHeight() {
    const hero = document.querySelector('.hero');
    hero.style.minHeight = `${window.innerHeight}px`;
  }
  
  window.addEventListener('load', setHeroHeight);
  window.addEventListener('resize', setHeroHeight);
  