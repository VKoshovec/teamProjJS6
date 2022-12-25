import { refs } from '../refs';

refs.openModalBtn.addEventListener('click', toggleModalOpen);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.bckdrp.addEventListener('click', closeModalbyWindow);

function toggleModalOpen() {
  refs.modal.classList.remove('is-hidden');
  refs.body.style.overflow = 'hidden';
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  refs.body.style.overflow = '';
}

window.addEventListener('keydown', closeEsc);
function closeEsc(e) {
  if (e.key === 'Escape') {
    closeModal(e);
  }
}

function closeModalbyWindow() {
  refs.modal.classList.add('is-hidden');
}
