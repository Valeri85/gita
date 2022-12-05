const header = document.getElementById('header');
const moviesPage = document.getElementById('movies-page');

const headerHeight = header.getBoundingClientRect().height;
moviesPage.style.paddingTop = `${headerHeight}px`;

/*------------------------------------------------------------------------------*/

const API_KEY = '4f70fbbd83d33d1c2444b3928bc7b1df';
const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIES_URL = `${BASE_URL}/movie`;
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

// Discover Movies
async function showPopularMovies() {
	const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';
	const moviesData = await getMovies(POPULAR_MOVIES);

	const section = document.createElement('section');
	section.classList.add('movies-page__section');
	const ul = document.createElement('ul');
	ul.classList.add('movies__list');
	ul.setAttribute('id', 'movies-list');

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

	section.appendChild(ul);
	moviesPage.appendChild(section);
}

const init = async () => {
	await showPopularMovies();
};

init();
