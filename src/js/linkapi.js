import axios from "axios";
import Notiflix from "notiflix";

const keyApi = '0bf9a11da9d083f4751315d07dcbd89b';
const baseUrl = 'https://api.themoviedb.org/3/trending/movie/day';
const searchByWodrUrl = 'https://api.themoviedb.org/3/search/movie';
const searchByIdUrl = 'https://api.themoviedb.org/3/movie/';
const imgUrl = 'https://image.tmdb.org/t/p/w';
const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';

const loading = Notiflix.Loading.circle('loading result...');
const stopLoading = Notiflix.Loading.remove();

// Api test request
// https://api.themoviedb.org/3/movie/550?api_key=0bf9a11da9d083f4751315d07dcbd89b

//Api popular movie in a day
// https://api.themoviedb.org/3/trending/movie/day?api_key=0bf9a11da9d083f4751315d07dcbd89b

//Api search by word
// https://api.themoviedb.org/3/search/movie?api_key=0bf9a11da9d083f4751315d07dcbd89b&language=en-US&query=аватар&page=&include_adult=false

//Api get movie about by id
// https://api.themoviedb.org/3/movie/19995?language=en-US&api_key=0bf9a11da9d083f4751315d07dcbd89b

//Img link 
// https://image.tmdb.org/t/p/w500/198vrF8k7mfQ4FjDJsBmdQcaiyq.jpg

//Genres list 
// https://api.themoviedb.org/3/genre/movie/list?api_key=0bf9a11da9d083f4751315d07dcbd89b&language=en-US

export const movieLink = {

    //Objec method to get movies by page number
    async getMovies ( pageNumber ) {
            
        const params = {
            api_key: keyApi,
            page: pageNumber,
        };

        // loading;

        // try {

           const request = await axios.get ( baseUrl, { params } );

        //    stopLoading;
        //    return await request.data.results;
              return await request.data;

        // } catch (error) {
        //    stopLoading;
        //    Notiflix.Notify.failure(`Some broblems with api or query! Err: ${error}`) 
        // };
    },

    //Objec method to get movies by name
    async getMoviesByWord (queryWord, pageNumber) {
            
        const params = {
            api_key: keyApi,
            language: 'en-US',
            query: queryWord,
            page: pageNumber,
            include_adult: false,
        };

        // loading;

        // try {

           const request = await axios.get ( searchByWodrUrl, { params } );
        //    stopLoading;
        //   return await request.data.results;
           return await request.data;

        // } catch (error) {
            // stopLoading;
        //    Notiflix.Notify.failure(`Some broblems with api or query! Err: ${error}`) 
        // };
    },

    //Objec method to get movie about by id
    async getMoviesById ( movieId ) {
            
        const params = {
            language: 'en-US',
            api_key: keyApi,
        };

        loading;

        try {
            const request = await axios.get ( `${searchByIdUrl}${movieId}`, { params } );
            stopLoading;
            return await request.data;
        } catch (error) {
            stopLoading;
            Notiflix.Notify.failure(`Some broblems with api or query! Err: ${error}`);
        };
    },
  
    //Objec method to get geres list
    async getGenresList () {

        const params = {
            api_key: keyApi,
            language: 'en-US',
        };

        loading;

        try {
            const request = await axios.get ( genresUrl, { params } );
            stopLoading;
            return await request.data.genres;
        } catch (error) {
            stopLoading;
            Notiflix.Notify.failure(`Some broblems with api or query! Err: ${error}`);
        };
    },

    //Objec method to img full path
    getImageUrl (imgName, imgSize) {
        return `${imgUrl}${imgSize}/${imgName}`;
    },

}

