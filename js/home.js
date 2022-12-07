import { NOW_PLAYING_MOVIES, TOP_RATED_MOVIES, UPCOMING_MOVIES } from './constants.js';
import { createCard } from './helper.js';

const categoriesSection = document.querySelector('#main-page-categories');
const categoriesTabsContainer = categoriesSection.querySelector('#categories-tabs-container');
const categoriesTabs = categoriesSection.querySelectorAll('#categories-tab');

// Tabs
categoriesTabsContainer.addEventListener('click', async event => {
	const categoriesLists = categoriesSection.querySelectorAll('#cards-list');
	const upcomingMoviesList = categoriesSection.querySelector('.cards__list--upcoming');
	const nowPlayingMoviesList = categoriesSection.querySelector('.cards__list--now-playing');
	const clickedCategoryTab = event.target.closest('#categories-tab');

	if (!clickedCategoryTab) return;

	if (clickedCategoryTab.dataset.category === 'upcoming' && upcomingMoviesList == null) await showUpcomingMovies();
	if (clickedCategoryTab.dataset.category === 'now-playing' && nowPlayingMoviesList == null)
		await showNowPlayingMovies();

	categoriesTabs.forEach(tab => tab.setAttribute('data-active-tab', 'false'));
	categoriesLists.forEach(content => content.setAttribute('data-active-list', 'false'));

	clickedCategoryTab.setAttribute('data-active-tab', 'true');

	categoriesSection
		.querySelector(`.cards__list--${clickedCategoryTab.dataset.category}`)
		.setAttribute('data-active-list', 'true');
});

// Top Rated
async function showTopRatedMovies() {
	const ul = document.createElement('ul');
	ul.classList.add('cards__list', 'cards__list--top-rated');
	ul.setAttribute('id', 'cards-list');
	ul.setAttribute('data-active-list', 'true');

	await createCard(ul, TOP_RATED_MOVIES);

	categoriesSection.appendChild(ul);
}

// Upcoming
async function showUpcomingMovies() {
	const ul = document.createElement('ul');
	ul.classList.add('cards__list', 'cards__list--upcoming');
	ul.setAttribute('id', 'cards-list');
	ul.setAttribute('data-active-list', 'false');

	await createCard(ul, UPCOMING_MOVIES);

	categoriesSection.appendChild(ul);
}

// Now Playing
async function showNowPlayingMovies() {
	const ul = document.createElement('ul');
	ul.classList.add('cards__list', 'cards__list--now-playing');
	ul.setAttribute('id', 'cards-list');
	ul.setAttribute('data-active-list', 'false');

	await createCard(ul, NOW_PLAYING_MOVIES);

	categoriesSection.appendChild(ul);
}

const Init = async () => await showTopRatedMovies();

Init();
