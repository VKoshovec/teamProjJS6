import axios from "axios";
const keyApi = '0bf9a11da9d083f4751315d07dcbd89b';
const baseUrl = 'https://api.themoviedb.org/3/trending/movie/day';

// Api test reqvest
// https://api.themoviedb.org/3/movie/550?api_key=0bf9a11da9d083f4751315d07dcbd89b

//Api popular movie in a day
// https://api.themoviedb.org/3/trending/movie/day?api_key=0bf9a11da9d083f4751315d07dcbd89b

const params = {
    api_key: keyApi,
    page: 2
}

axios.get ( baseUrl, { params } ).then(
     res => console.log(res)
);