import * as part1 from './js/part';
import * as part2 from './js/part2';
import { movieLink } from './js/linkapi';
import './js/modal/modal-main';
import './js/modal/modal-team';
import { firebaseOptions } from './js/firebase-options';
import { renderFilms } from './js/renderFilms';
import { trendMovies } from './js/requests';

import { header } from './js/header';
import * as part2 from './js/scrollUp';
//getting popular film list
// movieLink.getMovies(1).then(res => console.log(res));

//getting film by key-word
// movieLink.getMoviesByWord('Аватар').then(res => console.log(res));

//getting film by id
// movieLink.getMoviesById(19995).then(res => console.log(res));

//getting img full-path from query
// console.log(movieLink.getImageUrl('94xxm5701CzOdJdUEdIuwqZaowx.jpg', 500));

// getting all genres list
// movieLink.getGenresList().then(res => console.log(res));

// renderFilms(1);

// trendMovies(1);
