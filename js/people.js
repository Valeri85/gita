import { POPULAR_PEOPLE, IMAGE_PATH } from './constants.js';
import { getAPIData } from './service.js';

const peoplePage = document.querySelector('[data-page="people"]');

// Discover Movies
async function showPopularPeople() {
	const persons = await getAPIData(POPULAR_PEOPLE);

	const section = document.createElement('section');
	section.classList.add('tv-shows-page__section');
	const ul = document.createElement('ul');
	ul.classList.add('cards__list');
	ul.setAttribute('id', 'cards-list');

	persons.forEach(person => {
		ul.insertAdjacentHTML(
			'beforeend',
			`
			<li class="cards__list-item">
				<article class="card">
					<img 
						class="card__poster"
						src="${IMAGE_PATH}${person.profile_path}"
						width='150'
						height='200'
						alt=""
					/>
					<a class="card__link" href="#" aria-label="Go To Details"></a>
					<div class="card__content">
						<h2 class="card__title">${person.name}</h2>
					</div>
				</article>
			</li>
			`
		);
	});

	section.appendChild(ul);
	peoplePage.appendChild(section);
}

const init = async () => await showPopularPeople();

init();
