const KEY_STORAGE_WATCHED = 'watched-films';
const KEY_STORAGE_QUEUE = 'films-in-the-queue';

const formDataWatched = [];
const formDataQueue = [];

const refs = {
  btnWatched: document.querySelector('.film-btn__watched'),
  btnQueue: document.querySelector('.film-btn__queue'),
};

const getWatchedList = () => {
  if (formDataWatched === []) {
    console.log('немає переглянутих фільмів');
    return;
  }

  const savedData = localStorage.getItem(KEY_STORAGE_WATCHED);
  const parseData = JSON.parse(savedData);
};

const getQueueList = () => {
  if (formDataQueue === {}) {
    console.log('немає фільмів доданих у чергу');
    return;
  }

  const savedData = localStorage.getItem(KEY_STORAGE_QUEUE);
  const parseData = JSON.parse(savedData);
};

const removeFromWatchedList = () => {
  if (refs.btnWatched.hasAttribute('[data-action = watched]')) {
    // refs.btnWatched.removeAttribute('[data-action = watched]')
    // refs.btnQueue.removeAttribute('disabled')
  }
};

const removeFromQueue = () => {
  if (refs.btnQueue.hasAttribute('[data-action = watched]')) {
    // refs.btnWatched.removeAttribute('[data-action = in-queue]')
    // refs.btnWatched.removeAttribute('disabled')
  }
};

const addFilmInWatchedList = event => {
  formDataWatched.push({ id: Date.now(), name: 'newName', year: 'someYear' });
  // refs.btnWatched.textContent = 'Remove from watched';
  // refs.btnWatched.setAttribute('[data-action = watched]')
  // refs.btnQueue.setAttribute('disabled', 'true')

  localStorage.setItem(KEY_STORAGE_WATCHED, JSON.stringify(formDataWatched));
};

const addFilmInQueue = event => {
  formDataQueue.push({ id: Date.now(), name: 'newName', year: 'someYear' });
  // refs.btnQueue.textContent = 'Remove from queue';
  // refs.btnQueue.setAttribute('[data-action = in-queue]')
  // refs.btnWatched.setAttribute('disabled', 'true')

  localStorage.setItem(KEY_STORAGE_QUEUE, JSON.stringify(formDataQueue));
};

refs.btnWatched.addEventListener('click', addFilmInWatchedList);
refs.btnQueue.addEventListener('click', addFilmInQueue);