import { POPULAR_TV_SHOWS } from './constants.js';
import { createCard } from './createCard.js';

// Discover Movies
async function showPopularTvShows() {
	const tvShowsPage = document.querySelector('[data-page="tv-shows"]');

	const section = document.createElement('section');
	const ul = document.createElement('ul');
	ul.classList.add('cards__list');
	ul.setAttribute('id', 'cards-list');

	await createCard('tv-shows', ul, POPULAR_TV_SHOWS);

	section.appendChild(ul);
	tvShowsPage.appendChild(section);
}

const init = async () => await showPopularTvShows();

init();
