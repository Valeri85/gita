import { POPULAR_MOVIES } from './constants.js';
import { createCard } from './helper.js';

const moviesPage = document.querySelector('[data-page="movies"]');

// Discover Movies
async function showPopularMovies() {
	const section = document.createElement('section');
	section.classList.add('movies-page__section');
	const ul = document.createElement('ul');
	ul.classList.add('cards__list');
	ul.setAttribute('id', 'cards-list');

	await createCard(ul, POPULAR_MOVIES);

	section.appendChild(ul);
	moviesPage.appendChild(section);
}

const init = async () => await showPopularMovies();

init();
