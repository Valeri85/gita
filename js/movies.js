import { POPULAR_MOVIES } from './constants.js';
import { createCard } from './createCard.js';

// Discover Movies
async function showPopularMovies() {
	const moviesPage = document.querySelector('[data-page="movies"]');

	const section = document.createElement('section');
	const ul = document.createElement('ul');
	ul.classList.add('cards__list');
	ul.setAttribute('id', 'cards-list');

	await createCard('movies', ul, POPULAR_MOVIES);

	section.appendChild(ul);
	moviesPage.appendChild(section);
}

const init = async () => await showPopularMovies();

init();
