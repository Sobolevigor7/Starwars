/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */

export function render(data) {
  const container = document.createElement('div');
  container.classList.add(
    'container',
    'd-flex',
    'justify-conten-between',
    'flex-wrap',
    'py-4',
  );
  let currentEpNumber = 1;
  for (const films of data.results) {
    const filmCard = document.createElement('div');
    const cardBody = document.createElement('div');
    const title = document.createElement('a');
    cardBody.id = currentEpNumber;
    filmCard.style.width = '33%';
    filmCard.classList.add('card', 'm-2');
    filmCard.style.cursor = 'pointer';
    cardBody.classList.add('card-body');
    title.classList.add('card-title');
    title.addEventListener('click', (el) => {
      el.preventDefault();
    });
    cardBody.addEventListener('click', (el) => {
      history.pushState(el.currentTarget.id, '', `?filmId=${el.currentTarget.id}`);
      window.history.go(0);
    });
    filmCard.append(cardBody);
    cardBody.append(title);
    title.innerHTML = `Номер ${currentEpNumber},<br>
    название: ${films.title}`;
    currentEpNumber += 1;
    container.append(filmCard);
  }
  return container;
}
