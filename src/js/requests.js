import { movieLink } from './linkapi';
import { pagination, navigation } from './pagination';
import { renderFilms } from './renderFilms';
import { refs } from './refs';
import Notiflix from 'notiflix';

let movies = [];
let genres = [];

export async function trendMovies(pageNum) {
  await movieLink
    .getMovies(pageNum)
    .then(response => (movies = response))
    .catch(error =>
      Notiflix.Notify.failure(
        `Some broblems with api or query! Err: ${error}`,
        {
          cssAnimationStyle: 'from-top',
          position: 'center-center',
          borderRadius: '25px',
          clickToClose: true,
        }
      )
    );
  if (movies.length === 0) return;
  await movieLink
    .getGenresList()
    .then(response => (genres = response))
    .catch(error =>
      Notiflix.Notify.failure(
        `Some broblems with api or query! Err: ${error}`,
        {
          cssAnimationStyle: 'from-top',
          position: 'center-center',
          borderRadius: '25px',
          clickToClose: true,
        }
      )
    );
  if (genres.length === 0) return;
  renderFilms(movies.results, genres);
  if (pageNum < 4) window.scrollTo(0, 0);
  else window.scrollTo(0, 216);
  pagination(movies.page, movies.total_pages, 'trending');
}

export async function searchMoies(searchWord, pageNum) {
  await movieLink
    .getMoviesByWord(searchWord, pageNum)
    .then(response => (movies = response))
    .catch(error =>
      Notiflix.Notify.failure(
        `Some broblems with api or query! Err: ${error}`,
        {
          cssAnimationStyle: 'from-top',
          position: 'center-center',
          borderRadius: '25px',
          clickToClose: true,
        }
      )
    );
  if (movies.length === 0) return;
  await movieLink
    .getGenresList()
    .then(response => (genres = response))
    .catch(error =>
      Notiflix.Notify.failure(
        `Some broblems with api or query! Err: ${error}`,
        {
          cssAnimationStyle: 'from-top',
          position: 'center-center',
          borderRadius: '25px',
          clickToClose: true,
        }
      )
    );
  if (genres.length === 0) return;
  if (movies.total_results === 0)
    return Notiflix.Notify.failure(
      `Sorry, there are no movies matching your search query. Please try again.`,
      {
        cssAnimationStyle: 'from-top',
        position: 'center-center',
        borderRadius: '25px',
        clickToClose: true,
      }
    );
  if (movies.page === 1)
    Notiflix.Notify.success(
      `Hooray! We found ${movies.total_results} movies.`,
      {
        cssAnimationStyle: 'from-top',
        position: 'center-center',
        borderRadius: '25px',
        clickToClose: true,
      }
    );

  renderFilms(movies.results, genres);
  if (pageNum < 4) window.scrollTo(0, 0);
  else window.scrollTo(0, 216);
  pagination(movies.page, movies.total_pages, searchWord);
}

trendMovies(1);
refs.pageNavigation.addEventListener('click', navigation, false);
refs.searchInput.focus();
refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  searchRequest();
});

function searchRequest() {
  refs.searchInput.blur();
  const movieRequest = refs.searchInput.value.trimRight().trimLeft();
  if (!/^[A-ZА-ЯЁЇІЄ\s]+$/i.test(movieRequest)) {
    Notiflix.Notify.failure(
      `Sorry, there are no moies matching your search query. Please try again.`,
      {
        cssAnimationStyle: 'from-top',
        position: 'center-center',
        borderRadius: '25px',
        clickToClose: true,
      }
    );
    refs.searchInput.value = '';
    return;
  }
  refs.pageNavigation.removeEventListener('click', navigation, false);
  searchMoies(movieRequest, 1);
  refs.pageNavigation.addEventListener('click', navigation, false);
}
