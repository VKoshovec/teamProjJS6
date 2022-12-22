export function getItemTemplate({
  title,
  backdrop_path,
  release_date,
  genre_ids,
  id,
}) {
  let img =
    'https://img.freepik.com/free-vector/abstract-coming-soon-background-torn-paper-style_1017-25514.jpg?w=740&t=st=1671702748~exp=1671703348~hmac=a3b8860f2515bf2059d737c854a66f96f214e543e9ef5e3e7cbf4be0b1dc40ee';
  const year = release_date.substr(0, 4);
  if (backdrop_path !== null) {
    img = ` https://image.tmdb.org/t/p/w500/${backdrop_path}`;
  }
  return `<li class="film-list__item" id ='${id}'>
      <a href="" class="film-list__link link">
        <div class="film-list__top-wrap">
          <picture>
            <source
              srcset="
              ${img}  1x,
             ${img}  2x 
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
            <img src="https://image.tmdb.org/t/p/w200/${backdrop_path}" />
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
