// Header
const header = document.getElementById('header');
const main = document.getElementById('main');

const headerHeight = header.getBoundingClientRect().height;
main.style.paddingTop = `${headerHeight}px`;

/*------------------------------------------------------------------------------*/

// Burger Menu
const burger = header.querySelector('.header__burger');
const menu = header.querySelector('.header__menu');

burger.addEventListener('click', () => {
	burger.classList.toggle('opened');

	burger.classList.contains('opened')
		? burger.setAttribute('aria-expanded', 'true')
		: burger.setAttribute('aria-expanded', 'false');

	menu.classList.toggle('show');
});

/*------------------------------------------------------------------------------*/
