// Header

const header = document.getElementById('header');
const moviesPage = document.getElementById('main-page');

const headerHeight = header.getBoundingClientRect().height;
moviesPage.style.paddingTop = `${headerHeight}px`;

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

/*------------------------------------------------------------------------------*/

// Movies

const categoriesSection = moviesPage.querySelector('#main-page-categories');

const API_KEY = '4f70fbbd83d33d1c2444b3928bc7b1df';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';
const MOVIES_URL = `${BASE_URL}/movie`;
const TOP_RATED_MOVIES = `${MOVIES_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const UPCOMING_MOVIES = `${MOVIES_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
const POPULAR_MOVIES = `${MOVIES_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`;

async function getMovies(url) {
	try {
		const response = await fetch(url);

		if (!response.ok) throw new Error('Something went wrong!');

		const data = await response.json();

		return data.results;
	} catch (error) {
		console.error(error);
	}
}

// Top Rated
async function showTopRatedMovies() {
	const moviesData = await getMovies(TOP_RATED_MOVIES);

	const ul = document.createElement('ul');
	ul.classList.add('movies__list', 'movies__list--top-rated');
	ul.setAttribute('id', 'movies-list');
	ul.setAttribute('data-active-list', 'true');

	moviesData.forEach(movieData => {
		const dateTimeAttr = new Date(movieData.release_date).toISOString();
		const date = new Date(movieData.release_date).toDateString().slice('4');

		ul.insertAdjacentHTML(
			'beforeend',
			`
			<li class="movies__list-item">
				<article class="movie__card">
					<small class="movie__budge">${movieData.vote_average}</small>
					<img 
						class="movie__poster"
						src="${IMAGE_PATH}${movieData.poster_path}"
						width='200px'
						height='200px'
						alt=""
					/>
					<a class="movie__link" href="#" aria-label="Go to Movie Details"></a>
					<div class="movie__content">
						<h2 class="movie__title">${movieData.original_title}</h2>
						<time class="movie__date" datetime=${dateTimeAttr}>${date}</time>
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
	const moviesData = await getMovies(UPCOMING_MOVIES);

	const ul = document.createElement('ul');
	ul.classList.add('movies__list', 'movies__list--upcoming');
	ul.setAttribute('id', 'movies-list');
	ul.setAttribute('data-active-list', 'false');

	moviesData.forEach(movieData => {
		const dateTimeAttr = new Date(movieData.release_date).toISOString();
		const date = new Date(movieData.release_date).toDateString().slice('4');

		ul.insertAdjacentHTML(
			'beforeend',
			`
			<li class="movies__list-item">
				<article class="movie__card">
					<small class="movie__budge">${movieData.vote_average}</small>
					<img 
						class="movie__poster"
						src="${IMAGE_PATH}${movieData.poster_path}"
						width='200px'
						height='200px'
						alt=""
					/>
					<a class="movie__link" href="#" aria-label="Go to Movie Details"></a>
					<div class="movie__content">
						<h2 class="movie__title">${movieData.original_title}</h2>
						<time class="movie__date" datetime=${dateTimeAttr}>${date}</time>
					</div>
				</article>
			</li>
			`
		);
	});

	categoriesSection.appendChild(ul);
}

// Popular
async function showPopularMovies() {
	const moviesData = await getMovies(POPULAR_MOVIES);

	const ul = document.createElement('ul');
	ul.classList.add('movies__list', 'movies__list--popular');
	ul.setAttribute('id', 'movies-list');
	ul.setAttribute('data-active-list', 'false');

	moviesData.forEach(movieData => {
		const dateTimeAttr = new Date(movieData.release_date).toISOString();
		const date = new Date(movieData.release_date).toDateString().slice('4');

		ul.insertAdjacentHTML(
			'beforeend',
			`
			<li class="movies__list-item">
				<article class="movie__card">
					<small class="movie__budge">${movieData.vote_average}</small>
					<img 
						class="movie__poster"
						src="${IMAGE_PATH}${movieData.poster_path}"
						width='150'
						height='200'
						alt=""
					/>
					<a class="movie__link" href="#" aria-label="Go to Movie Details"></a>
					<div class="movie__content">
						<h2 class="movie__title">${movieData.original_title}</h2>
						<time class="movie__date" datetime=${dateTimeAttr}>${date}</time>
					</div>
				</article>
			</li>
			`
		);
	});

	categoriesSection.appendChild(ul);
}

/*------------------------------------------------------------------------------*/

// Tabs

const categoriesTabsContainer = categoriesSection.querySelector('#categories-tabs-container');
const categoriesTabs = categoriesSection.querySelectorAll('#categories-tab');

categoriesTabsContainer.addEventListener('click', async event => {
	const categoriesLists = categoriesSection.querySelectorAll('#movies-list');
	const upcomingMoviesList = categoriesSection.querySelector(`.movies__list--upcoming`);
	const popularMoviesList = categoriesSection.querySelector(`.movies__list--popular`);
	const clickedCategoryTab = event.target.closest('#categories-tab');

	if (!clickedCategoryTab) return;

	if (clickedCategoryTab.dataset.category === 'upcoming' && upcomingMoviesList == null) await showUpcomingMovies();
	if (clickedCategoryTab.dataset.category === 'popular' && popularMoviesList == null) await showPopularMovies();

	categoriesTabs.forEach(tab => tab.setAttribute('data-active-tab', 'false'));
	categoriesLists.forEach(content => content.setAttribute('data-active-list', 'false'));

	// Activate tab
	clickedCategoryTab.setAttribute('data-active-tab', 'true');

	// Activate content area
	categoriesSection
		.querySelector(`.movies__list--${clickedCategoryTab.dataset.category}`)
		.setAttribute('data-active-list', 'true');
});

/*------------------------------------------------------------------------------*/

const Init = async () => {
	await showTopRatedMovies();
};

Init();

/*------------------------------------------------------------------------------*/
