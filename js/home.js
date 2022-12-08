import { NOW_PLAYING_MOVIES, TOP_RATED_MOVIES, UPCOMING_MOVIES, SEARCH } from './constants.js';
import { createCard, createCardsList } from './helper.js';

const categoriesSection = document.querySelector('#main-page-categories');
const categoriesTabsContainer = categoriesSection.querySelector('#categories-tabs-container');

// Tabs
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

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', async event => {
	const searchResults = document.getElementById('search-results');

	try {
		setTimeout(() => {
			console.log('first');
		}, 1000);

		const response = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=4f70fbbd83d33d1c2444b3928bc7b1df&language=en-US&query=${event.target.value}&page=1&include_adult=true`
		);

		if (!response.ok) throw new Error('Something went wrong!');

		const data = await response.json();

		console.log(data);
		// return data.results;
	} catch (error) {
		console.error(error);
	}

	console.log(searchResults);
});

/* ------------------------------------------------------------------ */

const Init = async () => await showTopRatedMovies();

Init();
