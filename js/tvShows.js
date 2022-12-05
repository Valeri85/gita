const header = document.getElementById('header');
const tvShowsPage = document.getElementById('tv-shows-page');

const headerHeight = header.getBoundingClientRect().height;
tvShowsPage.style.paddingTop = `${headerHeight}px`;

/*------------------------------------------------------------------------------*/

const API_KEY = '4f70fbbd83d33d1c2444b3928bc7b1df';
const BASE_URL = 'https://api.themoviedb.org/3';
const TV_SHOWS_URL = `${BASE_URL}/tv`;
const POPULAR_TV_SHOWS = `${TV_SHOWS_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`;

async function getTvShows(url) {
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
async function showPopularTvShows() {
	const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';
	const TvShowsData = await getTvShows(POPULAR_TV_SHOWS);

	const section = document.createElement('section');
	section.classList.add('tv-shows-page__section');
	const ul = document.createElement('ul');
	ul.classList.add('movies__list');
	ul.setAttribute('id', 'movies-list');

	TvShowsData.forEach(TvShowData => {
		const dateTimeAttr = new Date(TvShowData.first_air_date).toISOString();
		const date = new Date(TvShowData.first_air_date).toDateString().slice('4');

		ul.insertAdjacentHTML(
			'beforeend',
			`
			<li class="movies__list-item">
				<article class="movie__card">
					<small class="movie__budge">${TvShowData.vote_average}</small>
					<img 
						class="movie__poster"
						src="${IMAGE_PATH}${TvShowData.poster_path}"
						width='150'
						height='200'
						alt=""
					/>
					<a class="movie__link" href="#" aria-label="Go to Movie Details"></a>
					<div class="movie__content">
						<h2 class="movie__title">${TvShowData.original_name}</h2>
						<time class="movie__date" datetime=${dateTimeAttr}>${date}</time>
					</div>
				</article>
			</li>
			`
		);
	});

	section.appendChild(ul);
	tvShowsPage.appendChild(section);
}

const init = async () => {
	await showPopularTvShows();
};

init();
