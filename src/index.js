import * as part1 from './js/part';
import * as part2 from './js/part2';
import { movieLink } from './js/linkapi';
import './js/modal/modal-main';

movieLink.getMovies(1).then(res => console.log(res));
movieLink.getMoviesByWord('Аватар').then(res => console.log(res));
movieLink.getMoviesById(19995).then(res => console.log(res));
console.log(movieLink.getImageUrl('198vrF8k7mfQ4FjDJsBmdQcaiyq.jpg', 500));
