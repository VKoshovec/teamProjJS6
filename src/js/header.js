import { refs } from './refs';
import {} from './localeStorage';

const switchOnLibrary = e => {
  e.preventDefault();
  refs.homeBtn.classList.remove('active');
  refs.libraryBtn.classList.add('active');

  refs.header.classList.add('header__liberty');
  refs.searcBox.style.display = 'none';

  refs.watchedBtn.style.display = 'flex';
  refs.queueBtn.style.display = 'flex';

  refs.filmList.innerHTML = '';
};

refs.libraryBtn.addEventListener('click', switchOnLibrary);
