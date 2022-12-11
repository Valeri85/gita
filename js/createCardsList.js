export function createCardsList(className, isActive) {
	const Cardslist = document.createElement('ul');
	Cardslist.classList.add('cards__list', `cards__list--${className}`);
	Cardslist.setAttribute('id', 'cards-list');
	Cardslist.setAttribute('data-active-list', `${isActive}`);

	return Cardslist;
}
