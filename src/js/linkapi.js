import axios from "axios";
import Notiflix from "notiflix";

const keyApi = '0bf9a11da9d083f4751315d07dcbd89b';
const baseUrl = 'https://api.themoviedb.org/3/trending/movie/day';
const searchByWodrUrl = 'https://api.themoviedb.org/3/search/movie';
const searchByIdUrl = 'https://api.themoviedb.org/3/movie/';

// Api test reqvest
// https://api.themoviedb.org/3/movie/550?api_key=0bf9a11da9d083f4751315d07dcbd89b

//Api popular movie in a day
// https://api.themoviedb.org/3/trending/movie/day?api_key=0bf9a11da9d083f4751315d07dcbd89b

//Api search by word
// https://api.themoviedb.org/3/search/movie?api_key=0bf9a11da9d083f4751315d07dcbd89b&language=en-US&query=аватар&page=&include_adult=false

//Api get movie about by id
// https://api.themoviedb.org/3/movie/19995?language=en-US&api_key=0bf9a11da9d083f4751315d07dcbd89b

export const movieLink = {
     
    //Objec method to get movies by page number
    async getMovies ( pageNumber ) {
            
        const params = {
            api_key: keyApi,
            page: pageNumber,
        };

        try {
           return await axios.get ( baseUrl, { params } );
        } catch (error) {
           Notiflix.Notify.failure(`Some broblems with api or query! Err: ${error}`) 
        };
    },

    //Objec method to get movies by name
    async getMoviesByWord ( queryWord ) {
            
        const params = {
            api_key: keyApi,
            language: 'en-US',
            query: queryWord,
            include_adult: false,
        };

        try {

           return await axios.get ( searchByWodrUrl, { params } );

        } catch (error) {
           Notiflix.Notify.failure(`Some broblems with api or query! Err: ${error}`) 
        };
    },

    //Objec method to get movie about by id
    async getMoviesById ( movieId ) {
            
        const params = {
            language: 'en-US',
            api_key: keyApi,
        };

        try {

           return await axios.get ( `${searchByIdUrl}${movieId}`, { params } );

        } catch (error) {
            Notiflix.Notify.failure(`Some broblems with api or query! Err: ${error}`);
        };
    },

}

