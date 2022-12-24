import { refs } from './refs';
import { getQueueList } from './localStorage';

const switchOnLibrary = e => {
  e.preventDefault();
  refs.homeBtn.classList.remove('active');
  refs.libraryBtn.classList.add('active');

  refs.header.classList.add('header__liberty');
  refs.searcBox.style.display = 'none';

  refs.watchedBtn.style.display = 'flex';
  refs.queueBtn.style.display = 'flex';
  refs.queueBtn.classList.add('active-btn');

  getQueueList();
};

refs.queueBtn.addEventListener('click', () => {
  refs.watchedBtn.classList.remove('active-btn');
  refs.queueBtn.classList.add('active-btn');
});

refs.watchedBtn.addEventListener('click', () => {
  refs.queueBtn.classList.remove('active-btn');
  refs.watchedBtn.classList.add('active-btn');
});

refs.libraryBtn.addEventListener('click', switchOnLibrary);
