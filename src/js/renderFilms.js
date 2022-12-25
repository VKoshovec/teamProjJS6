import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getItemTemplate } from './getItemTemplate';
import { movieLink } from './linkapi';


const refs = {
  filmList: document.querySelector('.film-list'),
};

export async function renderFilms(responce, genres) {

  refs.filmList.innerHTML = "";

  let films = [];

   films = responce.map (element => getItemTemplate(element, genres));
   refs.filmList.insertAdjacentHTML('beforeend', films.join(''));
  
}