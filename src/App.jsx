import { useState , useEffect} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux"
import {getApiConfiguration, getGenres} from "./store/homeSlice"
import {fetchDataFromApi} from "./utils/api"

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import PageNotFound from './pages/404/PageNotFound'
import Explore from './pages/explore/Explore'


function App() {

  const dispatch = useDispatch();
  // const url = useSelector((state) => state.home.url );
  const { url } = useSelector((state) => state.home );
  //console.log(url)


     useEffect(() => {
      fetchApiConfig();
      genresCall();
     }, []);

  const fetchApiConfig = () => {
       fetchDataFromApi("/configuration")
              .then((res) => {
                //console.log(res)

                //below "original" indicates the size of the image
                //go through redux on browser by inspecting the browser
                const url = {
                  backdrop: res.images.secure_base_url + "original",
                  poster: res.images.secure_base_url + "original",
                  profile: res.images.secure_base_url + "original"
                }//go through HeroBanner.jsx where we have used these image path

                dispatch(getApiConfiguration(url));
              })
  }   



  //it is useful in Carousel.jsx file for showing respective genre type
  const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        })

        const data = await Promise.all(promises);//Promise.all() will return responses of both api calls at the same time
          console.log(data);

          //below we destructure genres i.e {genres} because the "data" actully
          //contains 2 arrays ,in each array there is an object i.e "genres" which is an array of objects that contains id and the name of the genre
        data.map(({genres}) => {
            return genres.map((item) => (allGenres[item.id] = item))
        })//here 'allGenres' is an object in which each id acts as a key and item as a value
        //item is an object which contains id and genre type 
        //you can check on browser by consoling

       // console.log(allGenres);
       dispatch(getGenres(allGenres));
  } 

//API testing
  //  useEffect(() => {
  //     apiTesting();
  //  }, []);

  // const apiTesting = () => {
  //      fetchDataFromApi("/movie/popular")
  //             .then((res) => {
  //               //console.log(res)
  //               dispatch(getApiConfiguration(res));
  //             })
  // }   


  return (
    
      <BrowserRouter>
        <Header/> 
         <Routes>
             <Route path='/' element={<Home/>} />
             <Route path='/:mediaType/:id' element={<Details/>} />
             <Route path='/search/:query' element={<SearchResult/>} />
             <Route path='/explore/:mediaType' element={<Explore/>} />
             <Route path='*' element={<PageNotFound/>} />
         </Routes>
        <Footer/> 
      </BrowserRouter>
  )
}

export default App
