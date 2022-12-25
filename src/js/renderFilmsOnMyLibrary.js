import { movieLink } from './linkapi';
import { getItemTemplateForStorage } from './getItemTemplateForStorage';
import { refs } from './refs';

export const renderFilmsOnMyLibrary = parseData => {
  refs.filmList.innerHTML = '';

  parseData.map(id => {
    movieLink
      .getMoviesById(id)
      .then(({ title, poster_path, release_date, genres, id }) => {
        const item = getItemTemplateForStorage({
          title,
          poster_path,
          release_date,
          genres,
          id,
        });
        refs.filmList.insertAdjacentHTML('beforeend', item);
      });
  });
};
