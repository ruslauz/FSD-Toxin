const burgerButton = document.querySelector('.js-burger-button');
const mobileMenu = document.querySelector('.js-mobile-menu')

if (burgerButton) {
  burgerButton.addEventListener('click', e => {
    e.target.classList.toggle('header__burger-button_opened')
    mobileMenu.classList.toggle('header__mobile-menu_opened')
    document.body.classList.toggle('fixed')
  })
}
