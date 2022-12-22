export function getItemTemplate({
    title,
    backdrop_path,
    release_date,
    genre_ids,
  }) {
    const year = release_date.substr(0, 4);
    return `<li class="film-list__item">
      <a href="" class="film-list__link link">
        <div class="film-list__top-wrap">
          <picture>
            <source
              srcset="
              https://image.tmdb.org/t/p/w500/${backdrop_path}  1x,
              https://image.tmdb.org/t/p/w500/${backdrop_path}  2x 
                                      "
              media="(min-width: 1280px)"
            />
            <source
              srcset="
              https://image.tmdb.org/t/p/w500/${backdrop_path}  1x,
              https://image.tmdb.org/t/p/w500/${backdrop_path}  2x 
                                      "
              media="(min-width: 768px)"
            />
            <source
              srcset="
              https://image.tmdb.org/t/p/w200/${backdrop_path}  1x,
              https://image.tmdb.org/t/p/w200/${backdrop_path}  2x 
                                      "
              media="(max-width: 480px)"
            />
            <img src="./images/film-1-mob-1x.jpg" alt="film" />
          </picture>
        </div>
        <div class="film-data">
          <h2 class="film-data__title">${title}</h2>
          <div class="film-data__info">
            <p class="film-data__genres">Drama, Comedy</p>
            <p class="film-data__year">${year}</p>
          </div>
        </div>
      </a>
    </li>`;
  }