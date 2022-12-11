// Header

const header = document.getElementById('header');
const page = document.getElementById('page');

const headerHeight = header.getBoundingClientRect().height;
page.style.paddingTop = `${headerHeight}px`;

/*------------------------------------------------------------------------------*/

// Burger Menu

const headerBurgerButton = header.querySelector('#header-burger');
const headerNavMenu = header.querySelector('#primary-navigation-menu');

headerBurgerButton.addEventListener('click', () => {
	const isOpened = headerBurgerButton.getAttribute('aria-expanded') === 'true';
	isOpened ? closeNavMenu() : openNavMenu();
});

function openNavMenu() {
	headerBurgerButton.setAttribute('aria-expanded', 'true');
	headerNavMenu.setAttribute('data-state', 'opened');
}

function closeNavMenu() {
	headerBurgerButton.setAttribute('aria-expanded', 'false');
	headerNavMenu.setAttribute('data-state', 'closing');
	headerNavMenu.addEventListener('animationend', () => headerNavMenu.setAttribute('data-state', 'closed'), {
		once: true,
	});
}
