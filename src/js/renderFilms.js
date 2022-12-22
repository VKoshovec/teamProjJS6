import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getItemTemplate } from './getItemTemplate';
import { movieLink } from './linkapi';

const refs = {
  searchForm: document.querySelector('.search_form'),
  submitButton: document.querySelector('.search_btn'),
  filmList: document.querySelector('.film-list'),
};

const numberPage = 1;
const genresList = [];

refs.searchForm.addEventListener('submit', handelSubmit);

popularMovies();

// Пошук за ключовим словом

async function handelSubmit(e) {
  e.preventDefault();
  let searcResult = [];
  const {
    elements: { query },
  } = e.currentTarget;

  if (query.value.trim() === '') {
    refs.searchForm.reset();
    return Notify.info('Будь ласка, напишіть назву фільму для пошуку!');
  }
  let serchValue = query.value;

  searcResult = await movieLink.getMoviesByWord(serchValue);
  if (searcResult.length === 0) {
    return Notify.info('За вашим запитом нічого не знайдено');
  }
  let films = searcResult.map(element => getItemTemplate(element));
  cleanerGallery();
  renderFilms(films);
  refs.searchForm.reset();
  console.log(searcResult);
}

// Перший рендер сторінки

async function popularMovies(numberPage) {
  const responce = await movieLink.getMovies(numberPage);
  const genres = await movieLink.getGenresList();

  let films = responce.map(element => getItemTemplate(element));
  renderFilms(films);

  console.log(responce);
}

function renderFilms(films) {
  refs.filmList.insertAdjacentHTML('beforeend', films.join(''));
}

function cleanerGallery() {
  refs.filmList.innerHTML = '';
}
