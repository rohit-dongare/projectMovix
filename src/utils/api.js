import axios from "axios";//using axios we will create global method to call api which we will use throughout the applicationon

const BASE_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN

const headers = {
    Authorization: "bearer " + TMDB_TOKEN
};

//here the endpoint i.e url for each movie is different which we will pass when the function is called
export const fetchDataFromApi = async (url, params) => {
     try {
        //below we destructured the data which we will come in response as a promise
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;
     } catch (error) {
        console.log(error);
        return error;
     }
}