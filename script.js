// Header

const header = document.getElementById('header');
const moviesPage = document.getElementById('movies-page');

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

// Tabs

const moviesTabsContainer = moviesPage.querySelector('#categories-tabs');
const moviesTabs = moviesPage.querySelectorAll('#categories-tab');
const moviesTabsContent = moviesPage.querySelectorAll('#movies-list');

moviesTabsContainer.addEventListener('click', event => {
	const clickedButton = event.target.closest('#categories-tab');

	if (!clickedButton) return;

	moviesTabs.forEach(tab => tab.setAttribute('data-active-tab', 'false'));
	moviesTabsContent.forEach(content => content.setAttribute('data-active-list', 'false'));

	// Activate tab
	clickedButton.setAttribute('data-active-tab', 'true');

	// Activate content area
	moviesPage.querySelector(`.movies__list--${clickedButton.dataset.tab}`).setAttribute('data-active-list', 'true');
});

/*------------------------------------------------------------------------------*/

// Movies

const movieTabContent = moviesPage.querySelector('.movies__list--1');

const API_KEY = '4f70fbbd83d33d1c2444b3928bc7b1df';
const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIES_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

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

async function showMovies() {
	const moviesData = await getMovies(MOVIES_URL);
	console.log(moviesData);

	moviesData.forEach(movieData => {
		movieTabContent.insertAdjacentHTML(
			'afterbegin',
			`
			<li class="movies__list-item">
				<article class="movie__card">
					<small class="movie__budge">${movieData.vote_average}</small>
					<img
						class="movie__poster"
						src="${BASE_URL}${movieData.backdrop_path}"
						width='300px'
						height='400px'
						alt=""
					/>
					<a class="movie__link" href="#" aria-label="Go to Movie Details"></a>
					<div class="movie__content">
						<h2 class="movie__title">${movieData.original_title}</h2>
						<time class="movie__date" datetime="Nov 9, 2022">Nov 9, 2022</time>
					</div>
				</article>
			</li>
			`
		);
	});
}

const Init = () => {
	showMovies();
};

Init();

/*------------------------------------------------------------------------------*/
