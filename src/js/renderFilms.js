import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getItemTemplate } from './getItemTemplate';
import { movieLink } from './linkapi';
const refs = {
  searchForm: document.querySelector('.search_form'),
  submitButton: document.querySelector('.search_btn'),
  filmList: document.querySelector('.film-list'),
};

const numberPage = 1;

refs.searchForm.addEventListener('submit', handelSubmit);

function handelSubmit(e) {
  e.preventDefault();

  const {
    elements: { query },
  } = e.currentTarget;

  if (query.value.trim() === '') {
    refs.searchForm.reset();
    return Notify.info('Будь ласка, напишіть назву фільму для пошуку!');
  }

  //   searchValue = searchQuery.value;
  console.log(query.value);
  refs.searchForm.reset();
}

async function renderFilms(numberPage) {
  let films = [];
  const responce = await movieLink.getMovies(numberPage);
  const genres = await movieLink.getGenresList();
  // const genresList = genres.map(element => element);

  films = responce.map(element => getItemTemplate(element));

  refs.filmList.insertAdjacentHTML('beforeend', films.join(''));
  console.log(responce);
}

renderFilms();

// function cleanerGallery() {
//   refs.photoCards.innerHTML = '';
// }
