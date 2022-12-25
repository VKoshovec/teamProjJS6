import { movieLink } from './linkapi';
import imageURL from '../images/placeholder.jpg';

export const getItemTemplateForStorage = ({
  title,
  poster_path,
  release_date,
  genres,
  id,
}) => {
  const genresList = genres.map(genre => genre.name).join(', ');
  const year = release_date ? release_date.substr(0, 4) : 'No release date';

  const cardImg1x = poster_path
    ? movieLink.getImageUrl(poster_path, 500)
    : imageURL;

  return `<li class="film-list__item" id= ${id}>
      <a href="" class="film-list__link link">
          <div class="film-list__top-wrap">
              <picture>
                  <source
                  srcset="
                     ${cardImg1x}  1x,
                     ${cardImg1x}  2x "
                  media="(min-width: 1280px)"
                  />
                  <source
                  srcset="
                    ${cardImg1x}  1x,
                    ${cardImg1x}  2x"
                     media="(min-width: 768px)"
                  />
                  <source
                  srcset="
                    ${cardImg1x}  1x,
                    ${cardImg1x}  2x"
                     media="(max-width: 480px)"
                  />
                  <img src="./images/film-1-mob-1x.jpg" 
                  alt="film" />
              </picture>
          </div>
          <div class="film-data">
            <h2 class="film-data__title">${title}</h2>
            <div class="film-data__info">
              <p class="film-data__genres">${genresList}</p>
              <p class="film-data__year">| ${year}</p>
            </div>
          </div>
        </a>
      </li>`;
};
