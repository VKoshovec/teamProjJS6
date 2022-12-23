import { trendMovies,  searchMoies } from './requests';
import { refs } from './refs';

let qwery = "";

export function pagination(currentPage, totalPage, qweryWord) {
  refs.pageNavigation.style.display = 'none';
  refs.pageBack.style.display = 'none';
  refs.pageNext.style.display = 'none';
  const pages = [];
  refs.pages.innerHTML = '';
  qwery = qweryWord;
  makeArray(pages, currentPage, totalPage);

  if (totalPage > 1) {
    refs.pageNavigation.style.display = 'flex';
    navigationRender(pages, currentPage, totalPage);
  }

  if (totalPage > 2 && currentPage !== totalPage) refs.pageNext.style.display = 'flex';
  if (totalPage > 2 && currentPage > 1) refs.pageBack.style.display = 'flex';

  function navigationRender(pages, pageCur, pageTot) {
    const markupPages = pages
      .map(page => makePage(page, pageCur, pageTot))
      .join('');
      // console.log("render");
    refs.pages.insertAdjacentHTML('beforeend', markupPages);
    refs.pageNavigation.addEventListener('click', navigation, { once: true });
    // refs.pageNavigation.addEventListener('click', navigation, false);
  }

  function navigation(event) {
    let nav = event.target.dataset.nav;
    if (event.target.dataset.nav === '...') return;
    if (event.target.nodeName.toUpperCase() === 'SVG')
      nav = event.target.parentNode.dataset.nav;
    if (event.target.nodeName.toUpperCase() === 'USE')
      nav = event.target.parentNode.parentNode.dataset.nav;
    // refs.pageNavigation.removeEventListener('click', navigation, false);
      // console.log("click", nav);

    switch (nav) {
      case 'next':
        switchQwery(qwery, currentPage + 1);
        break;

      case 'back':
        switchQwery(qwery, currentPage - 1);
        break;

      default:
        switchQwery(qwery, nav);
    }
  }

  function switchQwery(qwery, numPage) {
    switch (qwery) {
      case "trending":
        // console.log("trend", qwery, numPage);
        trendMovies(numPage);
        break;

      case "watched":
        // watched(numPage);
        break;

      case "queue":
        // queue(numPage);
        break;
  
      default:
        // console.log("word", qwery, numPage);
        searchMoies(qwery, numPage);
    }
  }

  function makePage(pageNum, pageCur, pageTot) {
    let current = '';
    let nav = pageNum;
    let pageClass = 'page';

    if (Number(pageNum) === Number(pageCur)) current = ' current';
    if (pageNum === '...') pageClass = 'points';

    return `<div class="${
      pageClass + current
    }" data-nav="${nav}">${pageNum}</div>`;
  }

  function makeArray(pages, pageCur, pageTot) {
    if (pageTot < 10) {
      fillArray(0, pageTot - 1, 1);
      return pages;
    } else {
      pages[0] = 1;
      pages[8] = pageTot;

      if (pageCur > 5) {
        pages[1] = '...';
      } else {
        pages[1] = 2;
      }
      if (pageCur < pageTot - 4) {
        pages[7] = '...';
      } else {
        pages[7] = pageTot - 1;
      }
      if (pageCur > 5 && pageCur < pageTot - 3) fillArray(2, 6, pageCur - 2);
      if (pageCur < 6) fillArray(2, 6, 3);
      if (pageCur > pageTot - 4) fillArray(2, 6, pageTot - 6);
      return pages;
    }
  }

  function fillArray(posBeg, posEnd, startVal) {
    for (let i = posBeg; i <= posEnd; i++) {
      pages[i] = startVal;
      startVal++;
    }
  }
}