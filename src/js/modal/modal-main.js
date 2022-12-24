import { movieLink } from '../linkapi';
import { getMovieById } from './getMovieById';
import { addFilmInWatchedList, addFilmInQueue } from '../localStorage';
import { getFetchVideo } from './video';
import { getVideoTemplates } from './video';

import * as basicLightbox from 'basiclightbox';
const basicLightbox = require('basiclightbox');

const refsO = {
  listFilm: document.querySelector('.film-list'),
  filmCardItem: document.querySelector('.film-list__item'),
  backdrop: document.querySelector('.js-backdrop'),
  // modalClose: document.querySelector('.js-btn-close-modal'),
  filmListCard: document.querySelector('.film-list__item'),
  movieCard: document.querySelector('.js-main-modal'),
  teaserBtnPlay: null,
};

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
  // console.log('li', id);

  movieLink
    .getMoviesById(id)
    .then(data => {
      const { genres } = data;
      // const genre = map.genres(genre => genre);

      // console.log(genres);
      const render = getMovieById(data, genres);
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

      refsO.teaserBtnPlay = document.querySelector('#teaser');
    })
    .catch(err => console.log(err));

  getFetchVideo(id)
    .then(({ results }) => {
      // console.log(results);
      const teaser = results.map(video => video);
      
      
      //fix no teaser
      if (results.length == 0){
        refsO.teaserBtnPlay.style.display = 'none';
        return;
      } ; 
      //fix no teaser


      const treiler = teaser[teaser.length - 1];

      // console.log(res_ult)

      let terailerKey = treiler.key;
      // const list = getVideoTemplates(terailerKey);
      // console.log(list);
      // return list;
      return terailerKey;
    })
    .then(terailerKey => {
      // console.log(terailerKey);

      const instance = basicLightbox.create(`
          <iframe class="video" width="800" height="600" src="https://www.youtube.com/embed/${terailerKey}"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
   
  `);
      refsO.teaserBtnPlay.addEventListener('click', () => {
        //   refsO.movieCard.insertAdjacentHTML('beforeend', list);

        instance.show();
      });
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
