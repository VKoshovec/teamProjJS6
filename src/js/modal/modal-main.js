import { movieLink } from '../linkapi';
import { getMovieById } from './getMovieById';
import {
  addfilmInList,
  getDataFromStorage,
  KEY_STORAGE_WATCHED,
  KEY_STORAGE_QUEUE,
} from '../localStorage';
import { getFetchVideo } from './video';
import { getVideoTemplates } from './video';

import * as basicLightbox from 'basiclightbox';
const basicLightbox = require('basiclightbox');

const refsO = {
  body: document.querySelector('body'),
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
      const render = getMovieById(data, genres);
      return render;
    })
    .then(render => {
      refsO.movieCard.innerHTML = '';
      refsO.movieCard.insertAdjacentHTML('beforeend', render);
      const modalClose = document.querySelector('.js-btn-close-modal');
      modalClose.addEventListener('click', closeMainModal);

      const btnWatched = document.querySelector('.film-btn__watched');
      const btnQueue = document.querySelector('.film-btn__queue');
      addfilmInList(btnWatched, btnQueue, id);

      const dataStorageWatched = getDataFromStorage(KEY_STORAGE_WATCHED);
      const dataStorageQueue = getDataFromStorage(KEY_STORAGE_QUEUE);

      if (dataStorageWatched.includes(id)) {
        btnWatched.textContent = 'remove from watched';
        btnWatched.classList.add('active-btn');
        btnQueue.setAttribute('disabled', 'true');
        btnQueue.style.cursor = 'not-allowed';
      }

      if (dataStorageQueue.includes(id)) {
        btnQueue.textContent = 'remove from queue';
        btnQueue.classList.add('active-btn');
        btnWatched.setAttribute('disabled', 'true');
        btnWatched.style.cursor = 'not-allowed';
      }

      refsO.teaserBtnPlay = document.querySelector('#teaser');
    })
    .catch(err => console.log(err));

  getFetchVideo(id)
    .then(({ results }) => {
      const teaser = results.map(video => video);

      //fix no teaser
      if (results.length == 0) {
        refsO.teaserBtnPlay.style.display = 'none';
        return;
      }
      //fix no teaser

      const treiler = teaser[teaser.length - 1];

      let terailerKey = treiler.key;

      return terailerKey;
    })
    .then(terailerKey => {
      const trailerRend = `
    <iframe class="video" width="800" height="600" src="https://www.youtube.com/embed/${terailerKey}"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`;

      const instance = basicLightbox.create(trailerRend);
      refsO.teaserBtnPlay.addEventListener('click', () => {
        instance.show();
      });
    })
    .catch(err => console.log(err));

  showMainModal();
}

function showMainModal() {
  window.addEventListener('keydown', onEscKeyClick);
  refsO.backdrop.classList.remove('is-hidden');
  refsO.body.classList.toggle('no-scroll');
  refsO.body.classList.add('no-scroll');
}

function closeMainModal() {
  window.removeEventListener('keydown', onEscKeyClick);
  refsO.backdrop.classList.add('is-hidden');
  refsO.body.classList.remove('no-scroll');
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
