import { TOP_RATED_MOVIES, UPCOMING_MOVIES, NOW_PLAYING_MOVIES, IMAGE_PATH } from './constants.js';
import { getAPIData } from './service.js';

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
	const movies = await getAPIData(TOP_RATED_MOVIES);

	const ul = document.createElement('ul');
	ul.classList.add('cards__list', 'cards__list--top-rated');
	ul.setAttribute('id', 'cards-list');
	ul.setAttribute('data-active-list', 'true');

	movies.forEach(movie => {
		const dateTimeAttr = new Date(movie.release_date).toISOString();
		const date = new Date(movie.release_date).toDateString().slice('4');

		ul.insertAdjacentHTML(
			'beforeend',
			`
			<li class="cards__list-item">
				<article class="card">
					<small class="card__budge">${movie.vote_average}</small>
					<img 
						class="card__poster"
						src="${IMAGE_PATH}${movie.poster_path}"
						width='200px'
						height='200px'
						alt=""
					/>
					<a class="card__link" href="#" aria-label="Go To Details"></a>
					<div class="card__content">
						<h2 class="card__title">${movie.original_title}</h2>
						<time class="card__date" datetime=${dateTimeAttr}>${date}</time>
					</div>
				</article>
			</li>
			`
		);
	});

	categoriesSection.appendChild(ul);
}

// Upcoming
async function showUpcomingMovies() {
	const movies = await getAPIData(UPCOMING_MOVIES);

	const ul = document.createElement('ul');
	ul.classList.add('cards__list', 'cards__list--upcoming');
	ul.setAttribute('id', 'cards-list');
	ul.setAttribute('data-active-list', 'false');

	movies.forEach(movie => {
		const dateTimeAttr = new Date(movie.release_date).toISOString();
		const date = new Date(movie.release_date).toDateString().slice('4');

		ul.insertAdjacentHTML(
			'beforeend',
			`
			<li class="cards__list-item">
				<article class="card">
					<small class="card__budge">${movie.vote_average}</small>
					<img 
						class="card__poster"
						src="${IMAGE_PATH}${movie.poster_path}"
						width='200px'
						height='200px'
						alt=""
					/>
					<a class="card__link" href="#" aria-label="Go To Details"></a>
					<div class="card__content">
						<h2 class="card__title">${movie.original_title}</h2>
						<time class="card__date" datetime=${dateTimeAttr}>${date}</time>
					</div>
				</article>
			</li>
			`
		);
	});

	categoriesSection.appendChild(ul);
}

// Now Playing
async function showNowPlayingMovies() {
	const movies = await getAPIData(NOW_PLAYING_MOVIES);

	const ul = document.createElement('ul');
	ul.classList.add('cards__list', 'cards__list--now-playing');
	ul.setAttribute('id', 'cards-list');
	ul.setAttribute('data-active-list', 'false');

	movies.forEach(movie => {
		const dateTimeAttr = new Date(movie.release_date).toISOString();
		const date = new Date(movie.release_date).toDateString().slice('4');

		ul.insertAdjacentHTML(
			'beforeend',
			`
			<li class="cards__list-item">
				<article class="card">
					<small class="card__budge">${movie.vote_average}</small>
					<img 
						class="card__poster"
						src="${IMAGE_PATH}${movie.poster_path}"
						width='150'
						height='200'
						alt=""
					/>
					<a class="card__link" href="#" aria-label="Go To Details"></a>
					<div class="card__content">
						<h2 class="card__title">${movie.original_title}</h2>
						<time class="card__date" datetime=${dateTimeAttr}>${date}</time>
					</div>
				</article>
			</li>
			`
		);
	});

	categoriesSection.appendChild(ul);
}

const Init = async () => await showTopRatedMovies();

Init();
