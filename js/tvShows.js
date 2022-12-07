import { POPULAR_TV_SHOWS, IMAGE_PATH } from './constants.js';
import { getAPIData } from './service.js';

const tvShowsPage = document.querySelector('[data-page="tv-shows"]');

// Discover Movies
async function showPopularTvShows() {
	const tvShows = await getAPIData(POPULAR_TV_SHOWS);

	const section = document.createElement('section');
	section.classList.add('tv-shows-page__section');
	const ul = document.createElement('ul');
	ul.classList.add('cards__list');
	ul.setAttribute('id', 'cards-list');

	tvShows.forEach(tvShow => {
		const dateTimeAttr = new Date(tvShow.first_air_date).toISOString();
		const date = new Date(tvShow.first_air_date).toDateString().slice('4');

		ul.insertAdjacentHTML(
			'beforeend',
			`
			<li class="cards__list-item">
				<article class="card">
					<small class="card__budge">${tvShow.vote_average}</small>
					<img 
						class="card__poster"
						src="${IMAGE_PATH}${tvShow.poster_path}"
						width='150'
						height='200'
						alt=""
					/>
					<a class="card__link" href="#" aria-label="Go To Details"></a>
					<div class="card__content">
						<h2 class="card__title">${tvShow.original_name}</h2>
						<time class="card__date" datetime=${dateTimeAttr}>${date}</time>
					</div>
				</article>
			</li>
			`
		);
	});

	section.appendChild(ul);
	tvShowsPage.appendChild(section);
}

const init = async () => await showPopularTvShows();

init();
