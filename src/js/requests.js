import { movieLink } from './linkapi';
import { pagination, navigation } from './pagination';
import { renderFilms } from './renderFilms';
import { refs } from './refs';
import Notiflix from 'notiflix';

export async function trendMovies(pageNum) {
  const movies = await movieLink.getMovies(pageNum);
  const genres = await movieLink.getGenresList();
  renderFilms(movies.results, genres);
  window.scrollTo(0, 0);
  pagination(movies.page, movies.total_pages, 'trending');
}

export async function searchMoies(searchWord, pageNum) {
  const movies = await movieLink.getMoviesByWord(searchWord, pageNum);
  const genres = await movieLink.getGenresList();
  if (movies.total_results === 0)
    return Notiflix.Notify.failure(
      `Sorry, there are no movies matching your search query. Please try again.`,
      {
        cssAnimationStyle: 'from-top',
        position: 'center-center',
        borderRadius: '25px',
      }
    );
  if (movies.page === 1)
    Notiflix.Notify.success(
      `Hooray! We found ${movies.total_results} movies.`,
      {
        cssAnimationStyle: 'from-top',
        position: 'center-center',
        borderRadius: '25px',
      }
    );
  renderFilms(movies.results, genres);
  window.scrollTo(0, 0);
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
      }
    );
    refs.searchInput.value = '';
    return;
  }
  refs.pageNavigation.removeEventListener('click', navigation, false);
  searchMoies(movieRequest, 1);
  refs.pageNavigation.addEventListener('click', navigation, false);
}
