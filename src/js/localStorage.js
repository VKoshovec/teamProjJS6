import { refs } from './refs';
import { renderFilmsOnMyLibrary } from './renderFilmsOnMyLibrary';
import Notiflix from 'notiflix';

const KEY_STORAGE_WATCHED = 'watched-films';
const KEY_STORAGE_QUEUE = 'films-in-the-queue';

const textInEmptyContainer =
  '<p class="text-in-empty-container">Please return to the home page and choose a movie...</p>';

let formDataQueue = [];
let formDataWatched = [];

const getDataFromStorage = key => {
  const savedData = localStorage.getItem(key);
  const parseData = JSON.parse(savedData);
  return parseData || [];
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

const getAllData = () => {
  formDataWatched = getDataFromStorage(KEY_STORAGE_WATCHED);
  formDataQueue = getDataFromStorage(KEY_STORAGE_QUEUE);
};

const addFilmInSutableList = (formData, id, key) => {
  if (formDataWatched.includes(id) || formDataQueue.includes(id)) {
    Notiflix.Notify.info('The movie has already been added to the list!');
    return;
  }

  Notiflix.Notify.success('Added to list of watched!');
  formData.push(id);
  localStorage.setItem(key, JSON.stringify(formData));
};

export const addfilmInList = (btnWatched, btnQueue, id) => {
  getAllData();
  btnWatched.addEventListener('click', () => {
    addFilmInSutableList(formDataWatched, id, KEY_STORAGE_WATCHED);
  });

  btnQueue.addEventListener('click', () => {
    addFilmInSutableList(formDataQueue, id, KEY_STORAGE_QUEUE);
  });
};

refs.queueBtn.addEventListener('click', getQueueList);
refs.watchedBtn.addEventListener('click', getWatchedList);
