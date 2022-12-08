import { POPULAR_PEOPLE, IMAGE_PATH } from './constants.js';
import { createCard } from './helper.js';
import { getAPIData } from './service.js';

// Discover Movies
async function showPopularPeople() {
	const peoplePage = document.querySelector('[data-page="people"]');

	const section = document.createElement('section');
	const ul = document.createElement('ul');
	ul.classList.add('cards__list');
	ul.setAttribute('id', 'cards-list');

	await createCard('people', ul, POPULAR_PEOPLE);

	section.appendChild(ul);
	peoplePage.appendChild(section);
}

const init = async () => await showPopularPeople();

init();
