import * as part1 from './js/part';
import * as part2 from './js/part2';
import { movieLink } from './js/linkapi';

movieLink.getMovies(1).then (res => console.log(res));
movieLink.getMoviesByWord('Аватар').then (res => console.log(res));
movieLink.getMoviesById(19995).then (res => console.log(res));