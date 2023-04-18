import Api from './api';
import cardTemplate from '../templates/cardTemplate.hbs';
import refs from './refs';
import { IMG_URL, IMG_URL_RETINA, DEFAULT_POSTER_URL } from './constants';

const api = new Api();

async function renderCards() {
  const moviesData = await api.fetchPopular();
  const genresList = await api.fetchGenresList();

  const data = moviesData.map(
    ({ poster_path, title, genre_ids, release_date, id }) => {
      const year = release_date.slice(0, 4);
      const gandresCount = genre_ids.length;
      const twoGanres = `${ganreName(genresList, genre_ids[0])}, ${ganreName(
        genresList,
        genre_ids[1]
      )}`;

      let genres = '';

      if (gandresCount === 1) {
        genres = ganreName(genresList, genre_ids[0]);
      } else if (gandresCount === 2) {
        genres = twoGanres;
      } else if (gandresCount > 2) {
        genres = `${twoGanres}, Other`;
      }

      const poster = poster_path
        ? `${IMG_URL}${poster_path}`
        : DEFAULT_POSTER_URL;

      const srcset = poster_path
        ? `${poster} 500w, ${IMG_URL_RETINA} 1280w`
        : DEFAULT_POSTER_URL;

      return { year, id, title, genres, poster, srcset };
    }
  );

  refs.cardListEl.innerHTML = cardTemplate(data);
}

function ganreName(ganres, id) {
  try {
    const ganreName = ganres.find(ganre => ganre.id === id);

    if (ganreName.name) {
      return ganreName.name;
    }
  } catch (error) {}
}

renderCards();
