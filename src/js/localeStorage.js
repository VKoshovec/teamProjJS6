import { refs } from './refs';
import { movieLink } from './linkapi';
// import { getItemTemplate } from './getItemTemplate';
// import { renderFilms } from './renderFilms';

const KEY_STORAGE_WATCHED = 'watched-films';
const KEY_STORAGE_QUEUE = 'films-in-the-queue';

const formDataWatched = [];
const formDataQueue = [];

const removeFromWatchedList = () => {
  if (refs.btnWatched.hasAttribute('[data-action = watched]')) {
    // refs.btnWatched.removeAttribute('[data-action = watched]')
    // refs.btnQueue.removeAttribute('disabled')
  }
};

const removeFromQueue = () => {
  if (refs.btnQueue.hasAttribute('[data-action = watched]')) {
    // refs.btnWatched.removeAttribute('[data-action = in-queue]')
    // refs.btnWatched.removeAttribute('disabled')
  }
};

const getItemTempl = ({ title, poster_path, year, genres, id }) => {
  return `<li class="film-list__item" id= ${id}>
    <a href="" class="film-list__link link">
        <div class="film-list__top-wrap">
            <picture>
                <source
                srcset="
                   ${movieLink.getImageUrl(poster_path, 500)}  1x,
                   ${movieLink.getImageUrl(poster_path, 500)}  2x "
                media="(min-width: 1280px)"
                />
                <source
                srcset="
                  ${movieLink.getImageUrl(poster_path, 500)}  1x,
                  ${movieLink.getImageUrl(poster_path, 500)}  2x"
                   media="(min-width: 768px)"
                />
                <source
                srcset="
                  ${movieLink.getImageUrl(poster_path, 500)}  1x,
                  ${movieLink.getImageUrl(poster_path, 500)}  2x"
                   media="(max-width: 480px)"
                />
                <img src="./images/film-1-mob-1x.jpg" 
                alt="film" />
            </picture>
        </div>
        <div class="film-data">
          <h2 class="film-data__title">${title}</h2>
          <div class="film-data__info">
            <p class="film-data__genres"></p>
            <p class="film-data__year">| ${year}</p>
          </div>
        </div>
      </a>
    </li>`;
};

export const addFilmInWatchedList = (btn, id) => {
  btn.addEventListener('click', () => {
    formDataWatched.push(id);
    localStorage.setItem(KEY_STORAGE_WATCHED, JSON.stringify(formDataWatched));
  });
};

export const addFilmInQueue = (btn, id) => {
  btn.addEventListener('click', () => {
    formDataQueue.push(id);
    localStorage.setItem(KEY_STORAGE_QUEUE, JSON.stringify(formDataQueue));
  });
};

const getWatchedList = () => {
  const savedData = localStorage.getItem(KEY_STORAGE_WATCHED);
  const parseData = JSON.parse(savedData);
  refs.filmList.innerHTML = '';

  const createArr = parseData.map(id => {
    movieLink
      .getMoviesById(id)
      .then(({ title, poster_path, year, genres, id }) => {
        const item = getItemTempl({ title, poster_path, year, genres, id });
        refs.filmList.insertAdjacentHTML('beforeend', item);
      });
  });
};

const getQueueList = () => {
  const savedData = localStorage.getItem(KEY_STORAGE_QUEUE);
  const parseData = JSON.parse(savedData);
  refs.filmList.innerHTML = '';
  console.log(parseData);

  const createArr = parseData.map(id => {
    movieLink
      .getMoviesById(id)
      .then(({ title, poster_path, year, genres, id }) => {
        const item = getItemTempl({ title, poster_path, year, genres, id });
        refs.filmList.insertAdjacentHTML('beforeend', item);
      });
  });
};

refs.queueBtn.addEventListener('click', getQueueList);
refs.watchedBtn.addEventListener('click', getWatchedList);
