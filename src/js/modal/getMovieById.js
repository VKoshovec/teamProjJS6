import { movieLink } from '../linkapi';

const posterUrl = 'https://image.tmdb.org/t/p/w';

export function getMovieById(
  {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,

    overview,
    id,
  },
  genres
) {
  let genresList = genres.map(element => element.name);
  console.log(genresList.join(', '));

  return `

      <div class="card-film film " id="${id}">
      <button class="btn-close-modal js-btn-close-modal" type="button">X</button>
      <div class="film__poster">
        <img
          src="${movieLink.getImageUrl(poster_path, 500)} "
          alt="poster"
          width="375"
          height="478"
        />
      </div>
      <div class="film__content">
        <h2 class="film__title">${title}</h2>

        <div class="list-wrapper">
          <ul class="film-list__left">
            <li class="item-left">
              <span>Vote / Votes</span>
            </li>
            <li class="item-left"><span>Popularity</span></li>
            <li class="item-left">
              <span>Original Title </span>
            </li>
            <li class="item-left"><span>Genre</span></li>
          </ul>
          <ul class="film-list__right">
            <li class="item-right item-right--vote">
              <span class="film-vote">${vote_average}</span>/<span>${vote_count}</span>
            </li>
            <li class="item-right item-right--popularity">
              <span>${popularity}</span>
            </li>
            <li class="item-right"><span>${original_title}</span></li>
            <li class="item-right"><span>${genresList.join(', ')}</span></li>
          </ul>
        </div>

        <p class="film__about">About</p>
        <p class="film__about-description">${overview} </p>
        <div class="button-wrapper">
          <button class="btn-modal film-btn__watched is-active">
            add to Watched
          </button>
          <button class="btn-modal film-btn__queue">add to queue</button>
        </div>
      </div>
    </div>                
       

  `;
}