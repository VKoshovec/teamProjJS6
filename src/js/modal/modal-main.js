const refsO = {
  listFilm: document.querySelector('.film-list'),
  filmCardItem: document.querySelector('.film-list__item'),
  backdrop: document.querySelector('.js-backdrop'),
  modalClose: document.querySelector('.js-btn-close-modal'),
  filmListCard: document.querySelector('.film-list__item'),
};

refsO.listFilm.addEventListener('click', onClickItem);
refsO.modalClose.addEventListener('click', closeMainModal);
refsO.backdrop.addEventListener('click', onBackdropClick);

function onClickItem(e) {
  e.preventDefault();
  if (e.currentTarget === e.target) {
    return;
  }
  console.log(refsO.filmListCard.getAttribute('id'));
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
