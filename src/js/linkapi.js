import axios from "axios";
import Notiflix from "notiflix";

const keyApi = '0bf9a11da9d083f4751315d07dcbd89b';
const baseUrl = 'https://api.themoviedb.org/3/trending/movie/day';

// Api test reqvest
// https://api.themoviedb.org/3/movie/550?api_key=0bf9a11da9d083f4751315d07dcbd89b

//Api popular movie in a day
// https://api.themoviedb.org/3/trending/movie/day?api_key=0bf9a11da9d083f4751315d07dcbd89b

export const movieLink = {
     
    //Objec method to get movies by page number
    async getMovies ( pageNumber ) {
            
        const params = {
            api_key: keyApi,
            page: pageNumber,
        };

        try {
           return  await axios.get ( baseUrl, { params } );
        } catch (error) {
           Notiflix.Notify.failure('Some broblems with api or query!') 
        };
    },

}

