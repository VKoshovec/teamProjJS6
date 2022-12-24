(() => {
  const refs = {
    openModalBtn: document.querySelector('.footer-modal'),
    closeModalBtn: document.querySelector('[data-teammodal-close]'),
    modal: document.querySelector('[data-modal-team]'),
    bckdrp: document.querySelector('.backdrop-team'),
  };

  refs.openModalBtn.addEventListener('click', toggleModalOpen);
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.bckdrp.addEventListener('click', closeModalbyWindow);

  function toggleModalOpen() {
    refs.modal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    refs.modal.classList.add('is-hidden');
    document.body.style.overflow = '';
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
})();
