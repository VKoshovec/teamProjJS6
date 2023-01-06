import { refs } from './refs';

const KEY_STORAGE = 'theme';

const savedLocalStorage = theme => {
  localStorage.setItem(KEY_STORAGE, theme);
};

export const getDataFromStorage = () => {
  const savedTheme = localStorage.getItem(KEY_STORAGE);
  changeOfTheme(savedTheme);
};

const removeLocalStorage = () => {
  localStorage.removeItem(KEY_STORAGE);
};

const changeOfDarkTheme = () => {
  refs.sunIcon.classList.remove('hidden');
  refs.moonIcon.classList.add('hidden');

  refs.body.style.backgroundColor = '#313131';
  refs.mainModal.classList.add('dark-modal');
  refs.modalTeam.classList.add('dark-modal-team');
  refs.dataTeam.classList.add('dark-team-content');

  refs.pageBack.style.backgroundColor = '#545454';
  refs.pageNext.style.backgroundColor = '#545454';

  refs.footer.classList.add('dark-footer');
  refs.footerText.classList.add('dark-footer-text');
  refs.openModalBtn.classList.add('dark-footer-text');
};

const changeOfLightTheme = () => {
  refs.moonIcon.classList.remove('hidden');
  refs.sunIcon.classList.add('hidden');

  refs.body.style.backgroundColor = '#ffffff';
  refs.mainModal.classList.remove('dark-modal');
  refs.modalTeam.classList.remove('dark-modal-team');
  refs.dataTeam.classList.remove('dark-team-content');

  refs.pageBack.style.backgroundColor = '#f7f7f7';
  refs.pageNext.style.backgroundColor = '#f7f7f7';

  refs.footer.classList.remove('dark-footer');
  refs.footerText.classList.remove('dark-footer-text');
  refs.openModalBtn.classList.remove('dark-footer-text');
};

const changeOfTheme = savedTheme => {
  const dataTitles = document.querySelectorAll('.film-data__title');
  const filmListItem = document.querySelectorAll('.film-list__item');

  if (refs.sunIcon.classList.contains('hidden')) {
    if (savedTheme === 'light') {
      return;
    }

    const theme = 'dark';
    removeLocalStorage();
    savedLocalStorage(theme);

    changeOfDarkTheme();
  } else {
    const theme = 'light';
    removeLocalStorage();
    savedLocalStorage(theme);
    changeOfLightTheme();
  }
};

refs.switcherBtn.addEventListener('click', changeOfTheme);
