import { IMAGE_PATH } from './constants.js';
import { getAPIData } from './service.js';

export async function createCard(element, url) {
	const datas = await getAPIData(url);

	datas.forEach(data => {
		const dateTimeAttr = new Date(data.release_date).toISOString();
		const date = new Date(data.release_date).toDateString().slice('4');

		return element.insertAdjacentHTML(
			'beforeend',
			`
        <li class="cards__list-item">
          <article class="card">
            <small class="card__budge">${data.vote_average}</small>
            <img 
              class="card__poster"
              src="${IMAGE_PATH}${data.poster_path}"
              width='200px'
              height='200px'
              alt=""
            />
            <a class="card__link" href="#" aria-label="Go To Details"></a>
            <div class="card__content">
              <h2 class="card__title">${data.original_title}</h2>
              <time class="card__date" datetime=${dateTimeAttr}>${date}</time>
            </div>
          </article>
        </li>
      `
		);
	});
}
