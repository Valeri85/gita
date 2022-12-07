import { POPULAR_MOVIES, IMAGE_PATH } from './constants.js';
import { getAPIData } from './service.js';

const moviesPage = document.querySelector('[data-page="movies"]');

// Discover Movies
async function showPopularMovies() {
	const moviesData = await getAPIData(POPULAR_MOVIES);

	const section = document.createElement('section');
	section.classList.add('movies-page__section');
	const ul = document.createElement('ul');
	ul.classList.add('cards__list');
	ul.setAttribute('id', 'cards-list');

	moviesData.forEach(movieData => {
		const dateTimeAttr = new Date(movieData.release_date).toISOString();
		const date = new Date(movieData.release_date).toDateString().slice('4');

		ul.insertAdjacentHTML(
			'beforeend',
			`
			<li class="cards__list-item">
				<article class="card">
					<small class="card__budge">${movieData.vote_average}</small>
					<img 
						class="card__poster"
						src="${IMAGE_PATH}${movieData.poster_path}"
						width='150'
						height='200'
						alt=""
					/>
					<a class="card__link" href="#" aria-label="Go To Details"></a>
					<div class="card__content">
						<h2 class="card__title">${movieData.original_title}</h2>
						<time class="card__date" datetime=${dateTimeAttr}>${date}</time>
					</div>
				</article>
			</li>
			`
		);
	});

	section.appendChild(ul);
	moviesPage.appendChild(section);
}

const init = async () => await showPopularMovies();

init();
