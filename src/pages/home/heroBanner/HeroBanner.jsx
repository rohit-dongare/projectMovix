import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import {useSelector} from "react-redux"

import "./style.scss";

import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home)//it contains poster image path, background image path, profile image path
  //also go through App.jsx file


  //custome hook
  const {data, loading} = useFetch("/movie/upcoming")//here we are getting the information of upcoming movies that includes the background image path, actors details and several things
  //here /movie/upcoming is an endpoint
  //console.log(data);


  useEffect(() => {
    //here the api data is the array of objects
    //here we are setting the random background image from the api data
    //we have 20 results coming from the api data 
     const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    // console.log(bg);
     setBackground(bg);//you can't directly assign image url to <image> or background image
     //go through documentation of tmdb website, you need three things i.e base_url, file path and file size that's why we have added this url.backdrop
     //go through app.jsx file to know more
  }, [data])


  const searchQueryHandler = (e) => {

    //api won't be called if you don't input field is empty and if you don't press enter key once you put something into it
    //and once you enter , you will navigate to the resulting page where you will find the movie you are searching for
     if (e.key === "Enter" && query.length > 0){
          navigate(`/search/${query}`);//also go through app.jx file
     }
  }

  return (
    <div className="heroBanner">

       {!loading && <div className="backdrop-img">
           <Img 
             src={background}
           />
       </div>}

       <div className="opacity-layer">
          
       </div>

     <ContentWrapper>
           <div className="heroBannerContent">
              <span className="title">Welcome.</span>
              <span className='subTitle'>
                Millions of movies, TV show and people 
                to discover. 
                Explore now.
              </span>
              <div className="searchInput">
                 <input 
                 onChange={(e) => setQuery(e.target.value)}
                 onKeyUp={searchQueryHandler}
                 type="text" 
                 placeholder='Search for a movie or tv show...'
                 />
                 <button>Search</button>
              </div>
           </div>
      </ContentWrapper>
    
    </div>
     
  )
}

export default HeroBanner