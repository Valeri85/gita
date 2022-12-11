import { API_KEY, NOW_PLAYING_MOVIES, SEARCH_URL, TOP_RATED_MOVIES, UPCOMING_MOVIES } from './constants.js';
import { createCard } from './createCard.js';
import { createCardsList } from './createCardsList.js';
import { getAPIData } from './service.js';

// Tabs
const categoriesSection = document.querySelector('#main-page-categories');
const categoriesTabsContainer = categoriesSection.querySelector('#categories-tabs-container');

categoriesTabsContainer.addEventListener('click', async event => {
	const categoriesTabs = categoriesSection.querySelectorAll('#categories-tab');
	const categoriesCardsLists = categoriesSection.querySelectorAll('#cards-list');
	const upcomingMoviesList = categoriesSection.querySelector('.cards__list--upcoming');
	const nowPlayingMoviesList = categoriesSection.querySelector('.cards__list--now-playing');
	const clickedCategoryTab = event.target.closest('#categories-tab');

	if (!clickedCategoryTab) return;

	if (clickedCategoryTab.dataset.category === 'upcoming' && upcomingMoviesList == null) await showUpcomingMovies();
	if (clickedCategoryTab.dataset.category === 'now-playing' && nowPlayingMoviesList == null) await showNowPlayingMovies();

	categoriesTabs.forEach(tab => tab.setAttribute('data-active-tab', 'false'));
	categoriesCardsLists.forEach(list => list.setAttribute('data-active-list', 'false'));

	clickedCategoryTab.setAttribute('data-active-tab', 'true');

	categoriesSection.querySelector(`.cards__list--${clickedCategoryTab.dataset.category}`).setAttribute('data-active-list', 'true');
});

// Top Rated
async function showTopRatedMovies() {
	const topRatedMovies = createCardsList('top-rated', true);
	await createCard('home', topRatedMovies, TOP_RATED_MOVIES);
	categoriesSection.appendChild(topRatedMovies);
}

// Upcoming
async function showUpcomingMovies() {
	const upcomingMovies = createCardsList('upcoming', false);
	await createCard('home', upcomingMovies, UPCOMING_MOVIES);
	categoriesSection.appendChild(upcomingMovies);
}

// Now Playing
async function showNowPlayingMovies() {
	const nowPlayingMovies = createCardsList('now-playing', false);
	await createCard('home', nowPlayingMovies, NOW_PLAYING_MOVIES);
	categoriesSection.appendChild(nowPlayingMovies);
}

// Search
const searchSection = document.getElementById('search-section');
const searchInput = searchSection.querySelector('#search-input');

let searchTimeout = 0;

searchInput.addEventListener('keyup', event => {
	const { value } = event.target;

	// Create results if keydown event (value) is only characters
	let searchResults =
		searchSection.querySelector('#search-results') ??
		searchSection.insertAdjacentHTML('beforeend', `<ul class="main-page__search-results" id="search-results"></ul>`);

	clearTimeout(searchTimeout);

	if (value !== '') {
		searchResults = searchSection.querySelector('#search-results');

		searchTimeout = setTimeout(async () => {
			const searchData = await getAPIData(`${SEARCH_URL}api_key=${API_KEY}&language=en-US&query=${value}&page=1&include_adult=true`);

			console.log(searchData);

			searchResults.innerHTML = JSON.stringify(searchData);
		}, 1000);
	}

	if (value === '') searchSection.removeChild(searchResults);
});

/* ------------------------------------------------------------------ */

const Init = async () => await showTopRatedMovies();

Init();
