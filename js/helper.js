import { IMAGE_PATH } from './constants.js';
import { getAPIData } from './service.js';

// Cards List
export function createCardsList(className, isActive) {
	const Cardslist = document.createElement('ul');
	Cardslist.classList.add('cards__list', `cards__list--${className}`);
	Cardslist.setAttribute('id', 'cards-list');
	Cardslist.setAttribute('data-active-list', `${isActive}`);

	return Cardslist;
}

// Card
export async function createCard(page, element, url) {
	const datas = await getAPIData(url);

	datas.forEach(data => {
		const card = element.insertAdjacentHTML(
			'beforeend',
			`
        <li class="cards__list-item">
          <article class="card">
            ${page !== 'people' ? `<small class="card__budge">${data.vote_average}</small>` : ''}
            <img 
              class="card__poster"
              src="${IMAGE_PATH}${data.profile_path ?? data.poster_path}"
              width='200px'
              height='200px'
              alt=""
            />
            <a class="card__link" href="#" aria-label="Go To Details"></a>
            <div class="card__content">
              <h2 class="card__title">${data.name ?? data.original_name ?? data.original_title}</h2>
              ${
								page !== 'people'
									? `
                      <time class="card__date" datetime=${
												page !== 'people' && new Date(data.release_date ?? data.first_air_date).toISOString()
											}>
                      ${page !== 'people' && new Date(data.release_date ?? data.first_air_date).toDateString().slice('4')}
                      </time>
                    `
									: ''
							}
            </div>
          </article>
        </li>
      `
		);

		return card;
	});
}
