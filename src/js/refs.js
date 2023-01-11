import { doc } from 'firebase/firestore/lite';

export const refs = {
  pageNavigation: document.querySelector('.loadMore'),
  pageBack: document.querySelector('.back'),
  pageNext: document.querySelector('.next'),
  pages: document.querySelector('.pages'),
  searchInput: document.querySelector('.search-field'),
  searchForm: document.querySelector('.search_form'),

  header: document.querySelector('.header'),
  //searchInput: document.querySelector('.input-wrapper'),
  searcBox: document.querySelector('.input-wrapper'),
  libraryBtn: document.querySelector('.nav_library'),
  homeBtn: document.querySelector('.nav_home'),
  watchedBtn: document.querySelector('.watched__btn'),
  queueBtn: document.querySelector('.queue__btn'),

  libraryBtn: document.querySelector('.nav_library'),
  filmList: document.querySelector('.film-list'),
  body: document.querySelector('.body'),
  openModalBtn: document.querySelector('.footer-modal'),
  closeModalBtn: document.querySelector('[data-teammodal-close]'),
  modal: document.querySelector('[data-modal-team]'),
  bckdrp: document.querySelector('.backdrop-team'),

  switcherBtn: document.querySelector('.button-switcher'),
  moonIcon: document.querySelector('.moon-icon'),
  sunIcon: document.querySelector('.sun-icon'),
  footer: document.querySelector('.footer'),
  footerText: document.querySelector('.footer-text-all'),
  mainModal: document.querySelector('.main-modal'),
  modalTeam: document.querySelector('.team-modal'),
  dataTeam: document.querySelector('.team-content'),
};
