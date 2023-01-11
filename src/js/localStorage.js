import { refs } from './refs';
import { renderFilmsOnMyLibrary } from './renderFilmsOnMyLibrary';
import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

export const KEY_STORAGE_WATCHED = 'watched-films';
export const KEY_STORAGE_QUEUE = 'films-in-the-queue';

const watchedAddTextBtn = 'ADD TO WATCH';
const queueAddTextBtn = 'ADD TO QUEUE';

const watchedRemoveTextBtn = 'REMOVE FROM WATCH';
const queueRemoveTextBtn = 'REMOVE FROM QUEUE';

const textInEmptyContainer =
  '<p class="text-in-empty-container">Please return to the home page and choose a movie...</p>';

let formDataQueue = [];
let formDataWatched = [];

export const getDataFromStorage = key => {
  const savedData = localStorage.getItem(key);
  const parseData = JSON.parse(savedData);
  return parseData || [];
};

const getAllData = () => {
  formDataWatched = getDataFromStorage(KEY_STORAGE_WATCHED);
  formDataQueue = getDataFromStorage(KEY_STORAGE_QUEUE);
};

export const getWatchedList = () => {
  const getData = getDataFromStorage(KEY_STORAGE_WATCHED);
  if (getData.length === 0) {
    refs.filmList.innerHTML = textInEmptyContainer;
    return;
  }
  renderFilmsOnMyLibrary(getData);
};

export const getQueueList = () => {
  const getData = getDataFromStorage(KEY_STORAGE_QUEUE);
  if (getData.length === 0) {
    refs.filmList.innerHTML = textInEmptyContainer;
    return;
  }
  renderFilmsOnMyLibrary(getData);
};

const addFilmInSutableList = (formData, id, key) => {
  Notiflix.Notify.success('SUCCESS: added to list!');
  formData.push(id);
  localStorage.setItem(key, JSON.stringify(formData));
};

const removeFromStorageList = (
  clickableButton,
  unclickableButton,
  formData,
  key,
  id,
  text
) => {
  clickableButton.textContent = `${text}`;
  clickableButton.classList.remove('active-btn');

  unclickableButton.removeAttribute('disabled');
  unclickableButton.style.cursor = 'pointer';

  const index = formData.findIndex(savedId => savedId === id);
  formData.splice(index, 1);

  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(formData));
  Notiflix.Notify.success(`SUCCESS: deleted from list!`);
};

const changesClickableBtn = (btn, text) => {
  btn.textContent = `${text}`;
  btn.classList.add('active-btn');
};

const changesUnclickableBtn = btn => {
  btn.setAttribute('disabled', 'true');
  btn.style.cursor = 'not-allowed';
};

export const addfilmInList = (btnWatched, btnQueue, id) => {
  getAllData();
  btnWatched.addEventListener(
    'click',
    throttle(() => {
      if (btnWatched.classList.contains('active-btn')) {
        removeFromStorageList(
          btnWatched,
          btnQueue,
          formDataWatched,
          KEY_STORAGE_WATCHED,
          id,
          watchedAddTextBtn
        );

        if (refs.watchedBtn.classList.contains('active-liberty-btn')) {
          renderFilmsOnMyLibrary(formDataWatched);
        }

        return;
      }

      addFilmInSutableList(formDataWatched, id, KEY_STORAGE_WATCHED);
      if (refs.watchedBtn.classList.contains('active-liberty-btn')) {
        renderFilmsOnMyLibrary(formDataWatched);
      }
      changesClickableBtn(btnWatched, watchedRemoveTextBtn);
      changesUnclickableBtn(btnQueue);
    }, 250)
  );

  btnQueue.addEventListener(
    'click',
    throttle(() => {
      if (btnQueue.classList.contains('active-btn')) {
        removeFromStorageList(
          btnQueue,
          btnWatched,
          formDataQueue,
          KEY_STORAGE_QUEUE,
          id,
          queueAddTextBtn
        );
        if (refs.queueBtn.classList.contains('active-liberty-btn')) {
          renderFilmsOnMyLibrary(formDataQueue);
        }
        return;
      }

      addFilmInSutableList(formDataQueue, id, KEY_STORAGE_QUEUE);
      if (refs.queueBtn.classList.contains('active-liberty-btn')) {
        renderFilmsOnMyLibrary(formDataQueue);
      }
      changesClickableBtn(btnQueue, queueRemoveTextBtn);
      changesUnclickableBtn(btnWatched);
    }, 250)
  );
};

refs.watchedBtn.addEventListener('click', getWatchedList);
refs.queueBtn.addEventListener('click', getQueueList);
