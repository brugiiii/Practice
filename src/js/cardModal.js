import refs from './refs';
import Api from './api';
import cardModalTemplate from '../templates/cardModalTemplate.hbs';
import backdropClose from './backdropClose';
import { IMG_URL, IMG_URL_RETINA, DEFAULT_POSTER_URL } from './constants';

const api = new Api();
const { cardListEl, backdropEl, bodyEl } = refs;

cardListEl.addEventListener('click', onCard);

async function onCard(e) {
  if (e.target.tagName === 'UL') {
    return;
  }

  const cardId = e.target.closest('LI').dataset.action;
  const cardData = getData(await api.fetchById(cardId));

  bodyEl.style.overflow = 'hidden';
  backdropEl.classList.remove('is-hidden');
  backdropEl.innerHTML = cardModalTemplate(cardData);

  backdropClose();
}

function getData(data) {
  const {
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
    poster_path,
  } = data;

  const vote = String(vote_average).slice(0, 3);
  const genresNames = genres.map(genre => genre.name).join(', ');
  const slicedPopularity = String(popularity).slice(
    0,
    String(popularity).indexOf('.') + 2
  );
  const poster = poster_path ? `${IMG_URL}${poster_path}` : DEFAULT_POSTER_URL;
  const srcset = poster_path
    ? `${poster} 500w, ${IMG_URL_RETINA} 1280w`
    : DEFAULT_POSTER_URL;

  return {
    title,
    vote,
    vote_count,
    slicedPopularity,
    original_title,
    genresNames,
    overview,
    poster,
    srcset,
  };
}
