import { doc } from 'firebase/firestore/lite';

const refs = {
  filmList: document.querySelector('.film-list'),
  filmCardItem: document.querySelector('.film-list__item'),
  backdrop: document.querySelector('.js-backdrop'),
  modalClose: document.querySelector('.js-btn-close-modal'),
};

refs.filmList.addEventListener('click', onClickItem);
refs.modalClose.addEventListener('click', closeMainModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onClickItem(e) {
  e.preventDefault();
  if (e.currentTarget === e.target) {
    return;
  }
  showMainModal();
}

function showMainModal() {
  window.addEventListener('keydown', onEscKeyClick);
  refs.backdrop.classList.remove('is-hidden');
}

function closeMainModal() {
  window.removeEventListener('keydown', onEscKeyClick);
  refs.backdrop.classList.add('is-hidden');
}

function onBackdropClick(e) {
  if (e.currentTarget !== e.target) {
    return;
  }
  console.log('Click on the backdrop');
  closeMainModal();
}

function onEscKeyClick(e) {
  if (e.code === 'Escape') {
    closeMainModal();
  }
}
