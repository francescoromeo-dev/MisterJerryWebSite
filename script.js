let menu = document.querySelector('#menu-icon');
let navigationCenter = document.querySelector('.navigation-center');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navigationCenter.classList.toggle('open')
}