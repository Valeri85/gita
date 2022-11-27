//* Burger Menu

// Select navigation burger menu button element
const burger = document.querySelector('.header__burger');
// Select menu list element (ul)
const menu = document.querySelector('.header__menu');

/* 
    Adding an event listener to the burger menu button. 
    When the burger menu button is clicked, it will toggle the class 'opened' on itself. 
    If the burger menu button has the class 'opened', it will set the attribute 'aria-expanded' to true. 
    If the burger menu button does not have the class 'opened', it will set the attribute 'aria-expanded' to false. 
    It will also toggle the class 'show' on the menu list. 
*/
burger.addEventListener('click', () => {
	burger.classList.toggle('opened');

	burger.classList.contains('opened')
		? burger.setAttribute('aria-expanded', 'true')
		: burger.setAttribute('aria-expanded', 'false');

	menu.classList.toggle('show');
});

/*------------------------------------------------------------------------------*/
