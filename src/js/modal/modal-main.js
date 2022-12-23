import { movieLink } from '../linkapi';
import { getMovieById } from '../modal/getMovieById';
import { addFilmInWatchedList, addFilmInQueue } from '../localeStorage';

const refsO = {
  listFilm: document.querySelector('.film-list'),
  filmCardItem: document.querySelector('.film-list__item'),
  backdrop: document.querySelector('.js-backdrop'),
  // modalClose: document.querySelector('.js-btn-close-modal'),
  filmListCard: document.querySelector('.film-list__item'),
  movieCard: document.querySelector('.js-main-modal'),
};

// console.log(refsO.modalClose);

refsO.listFilm.addEventListener('click', onClickItem);
// refsO.modalClose.addEventListener('click', closeMainModal);
refsO.backdrop.addEventListener('click', onBackdropClick);

function onClickItem(e) {
  e.preventDefault();
  if (e.currentTarget === e.target) {
    return;
  }
  const parent = e.target.closest('li');
  let { id } = parent;
  console.log('li', id);

  movieLink
    .getMoviesById(id)
    .then(data => {
      const { genres } = data;
      // const genre = map.genres(genre => genre);

      console.log(genres);
      const render = getMovieById(data, genres);
      console.log(render);
      return render;
    })
    .then(render => {
      refsO.movieCard.innerHTML = '';
      refsO.movieCard.insertAdjacentHTML('beforeend', render);
      const modalClose = document.querySelector('.js-btn-close-modal');
      modalClose.addEventListener('click', closeMainModal);

      const btnWatched = document.querySelector('.film-btn__watched');
      addFilmInWatchedList(btnWatched, id);

      const btnQueue = document.querySelector('.film-btn__queue');
      addFilmInQueue(btnQueue, id);
    })
    .catch(err => console.log(err));

  showMainModal();
}

function showMainModal() {
  window.addEventListener('keydown', onEscKeyClick);
  refsO.backdrop.classList.remove('is-hidden');
}

function closeMainModal() {
  window.removeEventListener('keydown', onEscKeyClick);
  refsO.backdrop.classList.add('is-hidden');
}

function onBackdropClick(e) {
  if (e.currentTarget !== e.target) {
    return;
  }

  closeMainModal();
}

function onEscKeyClick(e) {
  if (e.code === 'Escape') {
    closeMainModal();
  }
}
