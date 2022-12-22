import { movieLink } from './linkapi';
import { pagination } from './pagination';
// import { renderFilms } from './renderFilms';

export async function trendMmovies(pageNum) {
  const movies = await movieLink.getMovies(pageNum);
//   const genres = await movieLink.getGenresList();
//   renderFilms(movies, genres);
  pagination(movies.data.page, movies.data.total_pages, 'trending');
}
