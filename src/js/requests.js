import { movieLink } from './linkapi';
import { pagination } from './pagination';
import { renderFilms } from './renderFilms';

export async function trendMovies(pageNum) {
  const movies = await movieLink.getMovies(pageNum);
  const genres = await movieLink.getGenresList();
  renderFilms(movies.results, genres);
  pagination(movies.page, movies.total_pages, 'trending');
}
