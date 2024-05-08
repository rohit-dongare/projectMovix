import React from 'react'
import { useParams } from 'react-router-dom'

import "./style.scss"
import useFetch from '../../hooks/useFetch'

import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videoSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

const Details = () => {

  const { mediaType, id } = useParams()//go through app.jsx where we have added routes at the end of code

  const {data, loading, error} = useFetch(`/${mediaType}/${id}/videos`);//fetch all the videos related to that movie or tv show
  // console.log(data);
   //console.log(data?.results?.[0]);

  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);//fetch all the crew data involved i.e directors and writers and also the cast in that movie or show
  //also we have renamed data as credits and loading as creditsLoading
  //console.log(credits);

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <DetailsBanner
        video={data?.results?.[0]}
        crew={credits?.crew}
      />
      <Cast
        data={credits?.cast}
        loading={creditsLoading}
      />
      <VideosSection 
        data={data}
        loading={loading}
      />
      <Similar
        mediaType={mediaType}
        id={id}
      />
      <Recommendation 
        mediaType={mediaType}
        id={id}
      />
    </div>
  )
}

export default Details