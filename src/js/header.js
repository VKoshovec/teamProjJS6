import { refs } from './refs';
import { getQueueList } from './localStorage';

const activatesLibraryBtn = () => {
  refs.homeBtn.classList.remove('active');
  refs.libraryBtn.classList.add('active');
};

const activatesWatchedBtn = () => {
  refs.queueBtn.classList.remove('active-liberty-btn');
  refs.watchedBtn.classList.add('active-liberty-btn');
};

const activatesQueueBtn = () => {
  refs.watchedBtn.classList.remove('active-liberty-btn');
  refs.queueBtn.classList.add('active-liberty-btn');
};

const changesAppearanceHeader = () => {
  refs.header.classList.add('header__liberty');
  refs.searcBox.style.display = 'none';
  refs.pageNavigation.style.display = 'none';

  refs.watchedBtn.style.display = 'flex';
  refs.queueBtn.style.display = 'flex';
  refs.queueBtn.classList.add('active-liberty-btn');
};

const switchOnLibrary = e => {
  e.preventDefault();
  activatesLibraryBtn();
  changesAppearanceHeader();

  refs.filmList.style.minHeight = '500px';
  getQueueList();
};

refs.libraryBtn.addEventListener('click', switchOnLibrary);
refs.watchedBtn.addEventListener('click', activatesWatchedBtn);
refs.queueBtn.addEventListener('click', activatesQueueBtn);
