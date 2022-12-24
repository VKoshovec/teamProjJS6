import { refs } from './refs';
import { movieLink } from './linkapi';
// import { getItemTemplate } from './getItemTemplate';
import imageURL from '../images/placeholder.png';
import Notiflix from 'notiflix';

const KEY_STORAGE_WATCHED = 'watched-films';
const KEY_STORAGE_QUEUE = 'films-in-the-queue';

let formDataQueue = [];
let formDataWatched = [];

const getItemTempl = ({ title, poster_path, release_date, genres, id }) => {
  const genresList = genres.map(genre => genre.name).join(', ');
  const year = release_date ? release_date.substr(0, 4) : 'No release date';

  const cardImg1x = poster_path
    ? movieLink.getImageUrl(poster_path, 500)
    : imageURL;

  return `<li class="film-list__item" id= ${id}>
    <a href="" class="film-list__link link">
        <div class="film-list__top-wrap">
            <picture>
                <source
                srcset="
                   ${cardImg1x}  1x,
                   ${cardImg1x}  2x "
                media="(min-width: 1280px)"
                />
                <source
                srcset="
                  ${cardImg1x}  1x,
                  ${cardImg1x}  2x"
                   media="(min-width: 768px)"
                />
                <source
                srcset="
                  ${cardImg1x}  1x,
                  ${cardImg1x}  2x"
                   media="(max-width: 480px)"
                />
                <img src="./images/film-1-mob-1x.jpg" 
                alt="film" />
            </picture>
        </div>
        <div class="film-data">
          <h2 class="film-data__title">${title}</h2>
          <div class="film-data__info">
            <p class="film-data__genres">${genresList}</p>
            <p class="film-data__year">| ${year}</p>
          </div>
        </div>
      </a>
    </li>`;
};

const renderFilms = parseData => {
  refs.filmList.innerHTML = '';

  parseData.map(id => {
    movieLink
      .getMoviesById(id)
      .then(({ title, poster_path, release_date, genres, id }) => {
        const item = getItemTempl({
          title,
          poster_path,
          release_date,
          genres,
          id,
        });
        refs.filmList.insertAdjacentHTML('beforeend', item);
      });
  });
};

const getDataFromWatched = () => {
  const savedData = localStorage.getItem(KEY_STORAGE_WATCHED);
  const parseData = JSON.parse(savedData);
  return parseData || [];
};

const getDataFromQueue = () => {
  const savedData = localStorage.getItem(KEY_STORAGE_QUEUE);
  const parseData = JSON.parse(savedData);
  return parseData || [];
};

export const getWatchedList = () => {
  renderFilms(getDataFromWatched());
};

export const getQueueList = () => {
  renderFilms(getDataFromQueue());
};

export const addFilmInWatchedList = (btn, id) => {
  btn.addEventListener('click', () => {
    formDataWatched = getDataFromWatched();

    if (formDataWatched.includes(id)) {
      Notiflix.Notify.info('The movie has already been added to the list!');
      return;
    }
    formDataWatched.push(id);
    localStorage.setItem(KEY_STORAGE_WATCHED, JSON.stringify(formDataWatched));
  });
};

export const addFilmInQueue = (btn, id) => {
  btn.addEventListener('click', () => {
    formDataQueue = getDataFromQueue();

    if (formDataQueue.includes(id)) {
      Notiflix.Notify.info('The movie has already been added to the list!');
      return;
    }

    formDataQueue.push(id);
    localStorage.setItem(KEY_STORAGE_QUEUE, JSON.stringify(formDataQueue));
  });
};

refs.queueBtn.addEventListener('click', getQueueList);
refs.watchedBtn.addEventListener('click', getWatchedList);
