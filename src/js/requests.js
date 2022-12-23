import { movieLink } from './linkapi';
import { pagination } from './pagination';
import { renderFilms } from './renderFilms';
import { refs } from './refs';
import Notiflix from 'notiflix';

export async function trendMovies(pageNum) {
  const movies = await movieLink.getMovies(pageNum);
  const genres = await movieLink.getGenresList();
  renderFilms(movies.results, genres);
  pagination(movies.page, movies.total_pages, 'trending');
}

export async function searchMoies(searchWord, pageNum) {
  const movies = await movieLink.getMoviesByWord(searchWord, pageNum);
  const genres = await movieLink.getGenresList();
  renderFilms(movies.results, genres);
  // console.log(movies.page, movies.total_pages, searchWord);
  pagination(movies.page, movies.total_pages, searchWord);
}

trendMovies(1);

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
      `Sorry, there are no moies matching your search query. Please try again.`
    );
    refs.searchInput.value = '';
    return;
  }
  searchMoies(movieRequest, 1);
}
